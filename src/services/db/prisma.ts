import { Prisma, PrismaClient } from '@prisma/client';

export let prisma: PrismaClient;

export function createPrismaClient(config: Prisma.PrismaClientOptions | null = null): PrismaClient {
	if (config) {
		prisma = new PrismaClient(config);
		return prisma;
	}
	prisma = new PrismaClient();
	return prisma;
}