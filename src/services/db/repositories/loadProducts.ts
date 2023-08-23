import { DBType } from '../../../types/DBType';
import { prisma } from '../prisma';

export async function loadProducts(): Promise<DBType> {
	const product = await prisma.product.findMany();

	if (!product) {
		return {
			error: true,
			message: 'Products not found',
			data: null
		};
	}

	return {
		error: false,
		message: '',
		data: product
	};
}