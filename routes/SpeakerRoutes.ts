import { Router } from "express";
import multer from 'multer';
import { createSpeaker } from "../repository/SpeakerRepository";

// Configure multer for file uploads
const upload = multer();
const speakerRouter = Router();

speakerRouter.post('/', upload.single('image'), async (req, res) => {
    try {
        const { name, bio, expertise, speakerEmail } = req.body;
        const image = req.file ? req.file.buffer.toString('base64') : '';

        const newSpeaker = { name, bio, expertise, speakerEmail, image };
        console.log("Received form data:", newSpeaker); // Log incoming data for debugging

        const speaker = await createSpeaker(newSpeaker);
        res.status(201).json(speaker);
    } catch (err) {
        if (err instanceof Error && err.message.includes('Unique constraint')) {
            res.status(400).json({ error: 'Speaker email already exists' });
        } else {
            console.error('Error in POST /speaker:', err);
            res.status(500).json({ error: 'Failed to create speaker' });
        }
    }
});

export default speakerRouter;
