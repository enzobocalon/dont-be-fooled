import { DBType } from '../../../types/DBType';
import { prisma } from '../prisma';

const PAGE_SIZE = 10;

export async function loadHistory(page: number): Promise<DBType> {
	if (page < 0) {
		return {
			data: null,
			error: true,
			message: 'Page not provided'
		};
	}
	const pages = await prisma.history.count();

	const currentPage = page * PAGE_SIZE;

	const history = await prisma.history.findMany({
		skip: currentPage,
		take: PAGE_SIZE,
		include: {
			product: {
				select: {
					name: true,
				}
			},
			source: {
				select: {
					source: true
				}
			},
		},
		orderBy: {
			date: 'desc'
		}
	});

	if (!history) {
		return {
			data: null,
			error: true,
			message: 'Not history found'
		};
	}

	return {
		data: history,
		error: false,
		message: '',
		pages: pages
	};
}

export async function loadHistoryById(id: string, page: number): Promise<DBType> {
	if (page < 0) {
		return {
			data: null,
			error: true,
			message: 'Page not provided'
		};
	}

	const currentPage = page * PAGE_SIZE;

	const pages = await prisma.history.count({
		where: {
			productId: id
		}
	});
	const history = await prisma.history.findMany({
		where: {
			productId: id
		},
		skip: currentPage,
		take: PAGE_SIZE,
		include: {
			product: {
				select: {
					name: true,
				}
			},
			source: {
				select: {
					source: true
				}
			},
		},
		orderBy: {
			date: 'desc'
		}
	});

	if (!history) {
		return {
			data: null,
			error: true,
			message: 'Not history found'
		};
	}

	return {
		data: history,
		error: false,
		message: '',
		pages: pages
	};
}