import { redirect, useSearchParams } from "next/navigation";


export async function POST(req: Request) {
    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.search);

    const accountName = searchParams.get("name");
    console.log(accountName)

    if(!accountName) {
        Response.json({ error: true, message: "Account name not provided" });
        return setTimeout(() => {
            redirect("/")
        }, 5000)
    } 

    if(accountName.toString() == "Callum") {
        Response.json({ error: "Cannot delete admin account" })
        return setTimeout(() => {
            return redirect("/")
        }, 5000)
    }

    await prisma.user.update({
        where: {
            name: accountName
        },
        data: {
            workouts: {
                deleteMany: {}
            }
        }
    })

    await prisma.user.delete({
        where: {
            name: accountName?.toString() ?? ""
        }
    });

    
    return redirect("/")
}