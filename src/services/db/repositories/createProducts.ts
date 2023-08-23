import { DBType } from '../../../types/DBType';
import { prisma } from '../prisma';

export async function createProducts(name: string, image = ''): Promise<DBType> {
	if (!name) {
		return {
			error: true,
			message: 'Name is required',
			data: null
		};
	}

	const product = await prisma.product.create({
		data: {
			name,
			imageURL: image
		}
	});

	if (!product) {
		return {
			error: true,
			message: 'Error creating product',
			data: null
		};
	}

	return {
		error: false,
		message: 'Product created successfully',
		data: product
	};

}