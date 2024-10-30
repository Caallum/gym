import prisma from "@/lib/prisma";
import { createSession, deleteSession, verifySession } from "@/lib/session";
import { redirect } from "next/navigation";

export async function GET(req: Request) {
    deleteSession()

    redirect("/")
}