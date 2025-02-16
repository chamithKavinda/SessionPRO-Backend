import { PrismaClient } from "@prisma/client";

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
