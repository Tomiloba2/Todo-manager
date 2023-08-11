import {
    PrismaClient
} from '@prisma/client'

const globalThisForPrisma=global as unknown as {prisma:PrismaClient}
const prisma = globalThisForPrisma.prisma || new PrismaClient()

if (process.env.NODE_ENV !== "production") {
    globalThisForPrisma.prisma = prisma
}

export default prisma;