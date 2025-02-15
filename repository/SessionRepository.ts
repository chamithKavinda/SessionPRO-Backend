import {PrismaClient} from "@prisma/client";
import Session from "../model/Session";

const prisma = new PrismaClient();

type SessionCreateInput = Omit<Session, "sessionID">;

export async function createSession(sessionData: SessionCreateInput) {
    try {
        return await prisma.session.create({
            data: sessionData,
        });
    } catch (err) {
        console.error("Error creating session:", err);
        throw new Error("Fialed to create session");
    }
}

export async function getAllSessions() {
    try {
        return await prisma.session.findMany();
    } catch (err) {
        console.error("Error fetching sessions:", err);
        throw new Error("Failed to fetch sessions from the repository");
    }
}

