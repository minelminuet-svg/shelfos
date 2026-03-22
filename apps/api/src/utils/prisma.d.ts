import { PrismaClient } from '../../../../node_modules/.pnpm/@prisma+client@5.7.1_prisma@5.7.1/node_modules/.prisma/client';
declare global {
    var prisma: undefined | PrismaClient;
}
declare const prisma: PrismaClient;
export default prisma;
