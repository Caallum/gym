import prisma from "@/lib/prisma";
import { createSession, verifySession } from "@/lib/session";
import { redirect } from "next/navigation";

export async function GET(req: Request) {
    await prisma.user.create({
        data: {
            name: "Callum",
            workouts: {
                create: {
                    name: "Tricep Pushdowns",
                    reps: 8,
                    sets: 3,
                    complete: false
                }
            }
        }
    })
}

export async function POST(req: Request) {
    const data = await req.formData();
    const name = data.get("name");

    if(!name) {
        return Response.json({ error: "Invalid data provided" });
    }


    let user = await prisma.user.findFirst({
        where: {
            name: name?.toString() ?? ""
        },
        include: {
            workouts: true
        }
    })

    if(!user) {
        return Response.json({ error: "Incorrect user details provided" });
    }

    await createSession({
        name: name?.toString() ?? "",
        workouts: user.workouts
    })

    return redirect("/")
}