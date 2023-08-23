import { app, BrowserWindow, ipcMain, shell } from 'electron';
import path from 'node:path';
import child_process from 'node:child_process';
import fs from 'fs';
import fsExtra  from 'fs-extra';
import { createPrismaClient } from '../src/services/db/prisma';
import { PrismaClient } from '@prisma/client';
import { loadProducts } from '../src/services/db/repositories/loadProducts';
import { createSources } from '../src/services/db/repositories/createSources';
import { createProducts } from '../src/services/db/repositories/createProducts';
import loadScrapDate from '../src/services/db/repositories/loadScrapDate';
import { loadSources } from '../src/services/db/repositories/loadSources';
import { loadFeaturedProduct, loadFeaturedProductHistoryFromLastWeek, loadHistoryFeaturedProduct } from '../src/services/db/repositories/loadFeaturedProduct';
import { createFeaturedProduct } from '../src/services/db/repositories/createFeaturedProduct';
import { loadHistory, loadHistoryById } from '../src/services/db/repositories/loadHistory';
import { dbPath, dbURL, latestMigration, Migration, isDev } from './constants';
import { runPrismaCommand } from './prismaMigration';
// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.js
// │
process.env.DIST = path.join(__dirname, '../dist');
process.env.PUBLIC = app.isPackaged ? process.env.DIST : path.join(process.env.DIST, '../public');


let win: BrowserWindow | null;
// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL'];

let prisma: PrismaClient;
function createWindow() {

	prisma = createPrismaClient({
		datasources: {
			db: {
				url: dbURL
			}
		}
	});
	if (!isDev) {
		handleMigrations();
	}

	win = new BrowserWindow({
		icon: path.join(process.env.PUBLIC, 'electron-vite.svg'),
		webPreferences: {
			preload: path.join(__dirname, 'preload.js'),
			nodeIntegration: true,
			contextIsolation: true,
		},
	});

	// Test active push message to Renderer-process.
	win.webContents.on('did-finish-load', () => {
		win?.webContents.send('main-process-message', (new Date).toLocaleString());
	});

	if (VITE_DEV_SERVER_URL) {
		win.loadURL(VITE_DEV_SERVER_URL);
	} else {
		// win.loadFile('dist/index.html')
		win.loadFile(path.join(process.env.DIST, 'index.html'));
	}
	// win.removeMenu();
}

async function handleMigrations() {
	let needsMigration;
	const dbExists = fs.existsSync(dbPath);
	if (!dbExists) {
		// Copy internal db
		const internalDB = path.join(app.getAppPath(), '..', 'prisma', 'dev.db');
		await fsExtra.copy(internalDB, path.join(app.getPath('userData'), 'database.db'), {overwrite: true});
	}  else {
		try {
			const lastestAppliedMigration: Migration[] = await prisma.$queryRaw`select * from _prisma_migrations order by finished_at`;
			needsMigration = lastestAppliedMigration[lastestAppliedMigration.length - 1].migration_name !== latestMigration;
		} catch (e) {
			console.log(e);
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			needsMigration = true;
		}
	}

	if (needsMigration) {
		try {
			const schemaPath = path.join(app.getAppPath(), '..', 'node_modules', '.prisma', 'client', 'schema.prisma');
			const migrationsDest = path.join(app.getAppPath(), '..', 'node_modules', '.prisma', 'client', 'migrations');
			
			// Copy migrations to prismaPath
			const migrationsPath = path.join(app.getAppPath(), '..', 'prisma', 'migrations');
			await fsExtra.copy(migrationsPath, migrationsDest);

			await runPrismaCommand({
				command: ['migrate', 'deploy', '--schema', schemaPath],
				dbURL
			});
		} catch (e) {
			process.exit(1);
		}
	}
}
app.on('window-all-closed', () => {
	win = null;
});

app.whenReady().then(createWindow);

ipcMain.on('scrap', () => {
	console.log(path.resolve(__dirname, '../src/services/puppeteer/scrap.ts'));
	const child = child_process.exec(`npx ts-node ${path.resolve(__dirname, '../src/services/puppeteer/index.ts')}`, (error, stdout) => {
		console.log(stdout);
		if (error) {
			console.log(error);
		}
	});

	child.stdout?.on('data', data => {
		console.log({data});
		win?.webContents.send('scrap-progress', data.toString());
	});
});

ipcMain.on('open-link', (_, link: string) => {
	shell.openExternal(link);
});

ipcMain.on('load-products', async () => {
	const data = await loadProducts();
	win?.webContents.send('load-products', JSON.stringify(data));
});

ipcMain.on('create-products', async (_, data: {name: string, image: string}) => {
	const product = await createProducts(data.name, data.image);
	win?.webContents.send('create-products', JSON.stringify(product));
}); 

ipcMain.on('load-sources', async () => {
	const sources = await loadSources();
	win?.webContents.send('load-sources', JSON.stringify(sources));
});

ipcMain.on('create-sources', async (_, data: {productId: string, url: string}) => {
	const source = await createSources(data.productId, data.url);
	win?.webContents.send('create-sources',JSON.stringify(source));
});

ipcMain.on('load-scrap-date', async () => {
	const data = await loadScrapDate();
	win?.webContents.send('load-scrap-date', JSON.stringify(data));
});

ipcMain.on('load-featured-product', async () => {
	const data = await loadFeaturedProduct();
	win?.webContents.send('load-featured-product', JSON.stringify(data));
});

ipcMain.on('load-history-featured-product', async (_, data: {id: string}) => {
	const history = await loadHistoryFeaturedProduct(data.id);
	win?.webContents.send('load-history-featured-product', JSON.stringify(history));
});

ipcMain.on('create-featured-product', async (_, data: {id: string}) => {
	const product = await createFeaturedProduct(data.id);
	win?.webContents.send('create-featured-product', JSON.stringify(product));
});

ipcMain.on('load-history', async (_, data: {page: number}) => {
	const history = await loadHistory(data.page);
	win?.webContents.send('load-history', JSON.stringify(history));
});

ipcMain.on('load-history-id', async (_, data: {id: string, page: number}) => {
	const history = await loadHistoryById(data.id, data.page);
	win?.webContents.send('load-history-id', JSON.stringify(history));
});

ipcMain.on('load-featured-product-history-from-last-week', async () => {
	const history = await loadFeaturedProductHistoryFromLastWeek();
	win?.webContents.send('load-featured-product-history-from-last-week', JSON.stringify(history));
});