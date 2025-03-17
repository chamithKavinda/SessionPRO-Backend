import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from 'uuid';
import Session from "../model/Session";

const prisma = new PrismaClient();

type SessionCreateInput = Omit<Session, "sessionID">;

export async function createSession(sessionData: SessionCreateInput & { sessionID?: string }) {
    try {
        const sessionID = sessionData.sessionID || uuidv4(); // Generate a unique ID if not provided
        return await prisma.session.create({
            data: { ...sessionData, sessionID },
        });
    } catch (err) {
        console.error("Error creating session:", err);
        throw new Error("Failed to create session");
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

export async function updateSession(sessionID: string, sessionData: Partial<SessionCreateInput>) {
    try {
        const session = await prisma.session.update({
            where: { sessionID },
            data: sessionData,
        });
        return session;
    } catch (err) {
        console.error(`Error updating session with id ${sessionID}:`, err);
        throw err;
    }
}

export async function deleteSession(sessionID: string) {
    try {
        await prisma.session.delete({
            where: { sessionID },
        });
        return true;
    } catch (err) {
        console.error(`Error deleting session with id ${sessionID}:`, err);
        throw err;
    }
}