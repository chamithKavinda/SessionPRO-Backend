import { Router } from "express";
import { createSession} from "../repository/SessionRepository";

const sessionRouter = Router();

sessionRouter.post("/", async (req,res) => {
    try {
        const newSession = req.body;
        const session = await createSession(newSession);
        res.status(201).json(session);
    } catch (err) {
        if (err instanceof Error && err.message.includes("Unique constraint")) {
            res.status(400).json({ error: "SessionId already exists"});
        } else {
            console.error("Error in POST /session:", err);
            res.status(500).json({error: "Failed to create session"});
        }
    }
});

export default sessionRouter;