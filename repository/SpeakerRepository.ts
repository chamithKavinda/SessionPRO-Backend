import { PrismaClient } from "@prisma/client";
import Speaker from "../model/Speaker";

const prisma = new PrismaClient();

type SpeakerCreateInput = {
    name: string;
    bio?: string;
    expertise?: string;
    speakerEmail: string;
    image: string;
};

export async function createSpeaker(speakerData: SpeakerCreateInput) {
    try {
        return await prisma.speaker.create({
            data: speakerData,
        });
    } catch (err) {
        console.error('Error creating speaker:', err);
        throw new Error('Failed to create speaker');
    }
}

export async function getAllSpeakers() {
    try {
        return await prisma.speaker.findMany();
    } catch (err) {
        console.error("Error fetching speakers:", err);
        throw new Error("Failed to fetch speakers from the repository");
    }
}
