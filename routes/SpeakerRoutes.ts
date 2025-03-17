import { Router } from "express";
import multer from 'multer';
import { createSpeaker, getAllSpeakers, updateSpeaker , deleteSpeaker } from "../repository/SpeakerRepository";

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

speakerRouter.get("/", async (req, res) => {
    try {
        const speakerList = await getAllSpeakers();
        res.json(speakerList);
    } catch (err) {
        console.error("Error in GET /speakers:", err);
        res.status(500).json({ error: "Failed to fetch speakers" });
    }
});

speakerRouter.put('/:email', upload.single('image'), async (req, res) => {
    try {
        const speakerEmail = req.params.email;
        const { name, bio, expertise } = req.body;
        const image = req.file ? req.file.buffer.toString('base64') : '';

        const updatedSpeaker = { name, bio, expertise, image };
        console.log("Received update data:", updatedSpeaker);

        const speaker = await updateSpeaker(speakerEmail, updatedSpeaker);
        res.status(200).json(speaker);
    } catch (err) {
        console.error('Error in PUT /speaker:', err);
        res.status(500).json({ error: 'Failed to update speaker' });
    }
});

speakerRouter.delete('/:email', async (req, res) => {
    try {
        const speakerEmail = req.params.email;

        await deleteSpeaker(speakerEmail);
        res.status(204).send();
    } catch (err) {
        console.error('Error in DELETE /speaker:', err);
        res.status(500).json({ error: 'Failed to delete speaker' });
    }
});

export default speakerRouter;
