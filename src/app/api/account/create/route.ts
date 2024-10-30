import { redirect } from "next/navigation";


export async function POST(req: Request) {
    const data = await req.formData();   
    const name = data.get("name");

    if(!name) {
        Response.json({ error: "Invalid data provided" });
        return setTimeout(() => {
            redirect("/")
        }, 5000)
    }

    if(name == "Callum") {
        Response.json({ error: "Cannot create admin account" })
        return setTimeout(() => {
            redirect("/")
        }, 5000)
    }

    const user = await prisma.user.findFirst({
        where: {
            name: name?.toString()
        }
    });

    if(user) {
        Response.json({ error: "Account exists" });
        return setTimeout(() => {
            redirect("/")
        }, 5000)
    }

    await prisma.user.create({
        data: {
            name: name.toString(),
            workouts: {
                create: {
                    name: "Placeholder",
                    sets: 1,
                    reps: 1,
                    complete: true
                }
            }
        }
    })

    return redirect("/")
}