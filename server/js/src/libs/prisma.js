import { PrismaClient } from '@prisma/client';
const globalThisForPrisma = global;
const prisma = globalThisForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") {
    globalThisForPrisma.prisma = prisma;
}
export default prisma;
