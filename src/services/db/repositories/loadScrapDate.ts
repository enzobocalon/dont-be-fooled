import { prisma } from '../prisma';

export default async function loadScrapDate() {
	const date = await prisma.settings.findFirst();

	if (!date) return;

	return date.nextScrap;

}