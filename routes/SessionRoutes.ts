import { Router } from "express";
import { createSession , getAllSessions , updateSession , deleteSession} from "../repository/SessionRepository";

const sessionRouter = Router();

sessionRouter.post("/", async (req, res) => {
    try {
        const newSession = req.body;
        console.log("Creating new session:", newSession);
        const session = await createSession(newSession);
        res.status(201).json(session);
    } catch (err) {
        if (err instanceof Error && err.message.includes("Unique constraint")) {
            res.status(400).json({ error: "SessionId already exists" });
        } else {
            console.error("Error in POST /session:", err);
            res.status(500).json({ error: "Failed to create session" });
        }
    }
});

sessionRouter.get("/", async (req, res) => {
    try {
        const sessionList = await getAllSessions();
        res.json(sessionList);
    } catch (err) {
        console.error("Error in GET /sessions:", err);
        res.status(500).json({ error: "Failed to fetch sessions" });
    }
});

sessionRouter.put("/:sessionID", async (req, res) => {
    try {
        const sessionID = req.params.sessionID;
        const updateData = req.body;
        const updatedSession = await updateSession(sessionID, updateData);
        res.json(updatedSession);
    } catch (err) {
        if (err instanceof Error && err.message.includes("Record to update not found")) {
            res.status(404).json({ error: "Session not found" });
        } else if (err instanceof Error && err.message.includes("Unique constraint")) {
            res.status(400).json({ error: "Session Id already exists" });
        } else {
            console.error("Error in PUT /session/:sessionID:", err);
            res.status(500).json({ error: "Failed to update session" });
        }
    }
});

sessionRouter.delete("/:sessionID", async (req, res) => {
    try {
        const sessionID = req.params.sessionID;
        await deleteSession(sessionID);
        res.json({ sessionID });
    } catch (err) {
        if (err instanceof Error && err.message.includes("Record to delete does not exist")) {
            res.status(404).json({ error: "Session not found" });
        } else {
            console.error("Error in DELETE /session/:sessionID:", err);
            res.status(500).json({ error: "Failed to delete session" });
        }
    }
});

export default sessionRouter;