import { DBType } from '../../../types/DBType';
import { prisma } from '../prisma';

export async function loadSource(id: string): Promise<DBType> {
	if (!id) {
		return {
			error: true,
			message: 'Product must be specified',
			data: null,
		};
	}

	const sources = await prisma.source.findMany({
		where: {
			productId: id,
		}
	});

	return {
		error: false,
		data: sources,
		message: ''
	};
}