import path from 'node:path';
import {fork} from 'node:child_process';
import { mePath, qePath } from './constants';

export async function runPrismaCommand({command, dbURL}: {
  command: string[];
  dbURL: string;
}): Promise<number> {

	// Currently we don't have any direct method to invoke prisma migration programatically.
	// As a workaround, we spawn migration script as a child process and wait for its completion.
	// Please also refer to the following GitHub issue: https://github.com/prisma/prisma/issues/4703
	try {
		const exitCode = await new Promise((resolve) => {
			const prismaPath = path.resolve(__dirname, '..', 'node_modules/prisma/build/index.js');

			const child = fork(
				prismaPath,
				command,
				{
					env: {
						...process.env,
						DATABASE_URL: dbURL,
						PRISMA_MIGRATION_ENGINE_BINARY: mePath,
						PRISMA_QUERY_ENGINE_LIBRARY: qePath,

						// Prisma apparently needs a valid path for the format and introspection binaries, even though
						// we don't use them. So we just point them to the query engine binary. Otherwise, we get
						// prisma:  Error: ENOTDIR: not a directory, unlink '/some/path/electron-prisma-trpc-example/packed/mac-arm64/ElectronPrismaTrpcExample.app/Contents/Resources/app.asar/node_modules/@prisma/engines/prisma-fmt-darwin-arm64'
						PRISMA_FMT_BINARY: qePath,
						PRISMA_INTROSPECTION_ENGINE_BINARY: qePath
					},
					stdio: 'pipe'
				}
			);

			child.on('message', msg => {
				console.info(msg);
			});

			child.on('error', err => {
				console.error('Child process got error:', err);
			});

			child.on('close', (code) => {
				resolve(code);
			});

			child.stdout?.on('data',function(data){
				console.info('prisma: ', data.toString());
			});

			child.stderr?.on('data',function(data){
				console.error('prisma: ', data.toString());
			});
		});

		if (exitCode !== 0) throw Error(`command ${command} failed with exit code ${exitCode}`);

		return exitCode;
	} catch (e) {
		console.error(e);
		throw e;
	}
}