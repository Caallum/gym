

export async function getWorkouts(account: string) {
    return await prisma.workout.findMany({
        where: {
            username: account
        }
    })
}