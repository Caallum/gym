import { verifySession } from "@/lib/session";


export async function GET() {
    const session = await verifySession();

    return Response.json(session);
}