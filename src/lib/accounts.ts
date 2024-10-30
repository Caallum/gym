import prisma from "./prisma";

export async function getAccounts() {
    return await prisma.user.findMany();
}