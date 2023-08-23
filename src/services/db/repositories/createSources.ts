import { DBType } from '../../../types/DBType';
import { prisma } from '../prisma';

export async function createSources(id: string, url: string): Promise<DBType> {
	if (!id || !url) {
		return {
			error: true,
			data: null,
			message: 'Missing product or url',
		};
	}

	const source = await prisma.source.create({
		data: {
			productId: id,
			source: url
		}
	});

	return {
		error: false,
		data: source,
		message: 'Source created'
	};
}