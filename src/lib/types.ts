export type SessionPayload = {
    session: PrelimSessionPayload
    expiresAt: Date
}

export type PrelimSessionPayload = {
    name: string
    workouts: Workout[],
}

export type User = {
    name: string
    workouts: Workout[]
}

export type Workout = {
    id: string
    name: string
    reps: number
    sets: number
    complete: boolean
    username: string
}