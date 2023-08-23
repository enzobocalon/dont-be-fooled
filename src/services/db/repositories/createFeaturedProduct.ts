import { DBType } from '../../../types/DBType';
import { prisma } from '../prisma';

export async function createFeaturedProduct(id: string): Promise<DBType> {
	if (!id) {
		return {
			data: null,
			error: true,
			message: 'ID is required'
		};
	}

	const product = await prisma.settings.updateMany({
		data: {
			productId: id
		}
	});
  
	if (!product) {
		return {
			data: null,
			error: true,
			message: 'ID is required'
		};
	}

	return {
		data: null,
		error: false,
		message: 'Product changed successfully'
	};
}