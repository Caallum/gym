'use server';

import { verifySession } from "@/lib/session";
import Main from "./Main/Main";
import AdminPage from "./Main/Admin";
import { PrelimSessionPayload } from "@/lib/types";
import { getAccounts } from "@/lib/accounts";
import { getWorkouts } from "@/lib/workouts";

export default async function MainPage() {
    const session = await verifySession();
    let data: PrelimSessionPayload = session?.session as PrelimSessionPayload;
    let workouts = await getWorkouts(data.name);

    if(data?.name == "Callum") {

        return <AdminPage users={await getAccounts()} workouts={workouts} workoutsNo={await prisma.workout.count()} />
    } 
    
    return <Main />
}