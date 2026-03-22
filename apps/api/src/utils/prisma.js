"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("../../../../node_modules/.pnpm/@prisma+client@5.7.1_prisma@5.7.1/node_modules/.prisma/client");
const prismaClientSingleton = () => {
    return new client_1.PrismaClient();
};
const prisma = global.prisma ?? prismaClientSingleton();
exports.default = prisma;
if (process.env.NODE_ENV !== 'production')
    global.prisma = prisma;
