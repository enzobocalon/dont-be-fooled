import { createPrismaClient } from '../db/prisma';
import stores from './stores';
import puppeteer from 'puppeteer';

(async function () {
	const prisma = createPrismaClient();

	const sources = await prisma.source.findMany();

	if (!sources) return;

	for (let i = 0; i < sources.length; i++) {
		const source = sources[i];
		try {
			new URL(source.source);
		} catch {
			continue;
		}
		const browser = await puppeteer.launch({headless: false});
		const page = await browser.newPage();

		await page.goto(source.source, {
			waitUntil: 'networkidle2'
		});

		const storeName = source.source.split('.')[1];

		if (typeof stores[storeName] !== 'function') {
			await browser.close();
			continue;
		}
		let price;
		try {
			price = await stores[storeName](page);
		} catch {
			continue;
		}
		await browser.close();
		const convertedPrice = parseFloat(price);
		
		if (!convertedPrice) return;
			
		await prisma.history.create({
			data: {
				price: convertedPrice,
				sourceId: source.id,
				productId: source.productId
			}
		});
	}
  
	const scrapDate = await prisma.settings.findFirst();
	if (!scrapDate) {
		await prisma.settings.create({
			data: {
				version: '1.0.0',
				nextScrap: new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
			}
		});
	
		return;
	}
	
	await prisma.settings.updateMany({
		data: {
			nextScrap: new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
		}
	});
	
})();