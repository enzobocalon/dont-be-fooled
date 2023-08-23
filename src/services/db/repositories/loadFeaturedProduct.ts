import { DBType, ProductType } from '../../../types/DBType';
import { prisma } from '../prisma';

export async function loadHistoryFeaturedProduct(id: string): Promise<DBType> {
	if (!id) {
		return {
			data: null,
			error: true,
			message: 'Id is required.'
		};
	}

	const history = await prisma.history.findMany({
		where: {
			productId: id
		},
		orderBy: {
			price: 'asc'
		}
	});

	if (!history) {
		return {
			data: null,
			error: true,
			message: 'Cannot find price history for product'
		};
	}

	return {
		data: history,
		error: false,
		message: ''
	};
}

export async function loadFeaturedProduct(): Promise<DBType> {
	const settings = await prisma.settings.findMany();

	if (!settings) {
		return {
			data: null,
			error: true,
			message: 'Cannot find settings'
		};
	}

	const featuredProduct = settings[0].productId;

	if (!featuredProduct) {
		return {
			data: null,
			error: true,
			message: 'No product selected'
		};
	}

	const product = await prisma.product.findUnique({
		where: {
			id: featuredProduct
		}
	});

	if (!product) {
		return {
			data: null,
			error: true,
			message: 'Product not found'
		};
	}

	return {
		data: product,
		error: false,
		message: 'Product selected successfully'
	};
}

export async function loadFeaturedProductHistoryFromLastWeek(): Promise<DBType> {
	const product = await loadFeaturedProduct();
	if (!product || !product.data || product.error) {
		return {
			data: null,
			error: true,
			message: product.message || 'Product not found'
		};
	}

	const productData = product.data as ProductType;

	const today = new Date();
	const sevenDaysAgo = new Date(today);
	sevenDaysAgo.setDate(today.getDate() - 7);
	sevenDaysAgo.setHours(0, 0, 0, 0);
	
	const productHistory = await prisma.history.findMany({
		where: {
			productId: productData.id,
			date: {
				gte: sevenDaysAgo,
				lte: today
			}
		},
		orderBy: {
			date: 'desc'
		}
	});

	if (!productHistory) {
		return {
			data: null,
			error: true,
			message: 'Cannot find product history'
		};
	}

	return {
		data: productHistory,
		error: false,
		message: ''
	};
}