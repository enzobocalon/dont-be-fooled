import { DBType } from '../../../types/DBType';
import stores from '../../puppeteer/stores';
import { prisma } from '../prisma';

export async function loadSources(): Promise<DBType> {
	const sources = await prisma.source.findMany();

	const validSources = sources.filter(s => {
		try {
			const storeName = s.source.split('.')[1];
			if (typeof stores[storeName] !== 'function') throw new Error('Invalid store');

			new URL(s.source);
			return s;
		} catch (e) {
			return;
		}
	});

	return {
		error: false,
		data: validSources,
		message: ''
	};
}