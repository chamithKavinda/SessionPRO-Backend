import { Router } from "express";
import { createUser ,getAllUsers} from "../repository/UserRepository";

const userRouter = Router();

userRouter.post("/", async (req,res) => {
    try {
        const newUser = req.body;
        const user = await createUser(newUser);
        res.status(201).json(user);
    } catch (err) {
        if (err instanceof Error && err.message.includes("Unique constraint")) {
            res.status(400).json({ error: "User email already exists"});
        } else {
            console.error("Error in POST /user:", err);
            res.status(500).json({error: "Failed to create user"});
        }
    }
});

userRouter.get("/", async (req,res) => {
    try {
        const userList = await getAllUsers();
        res.json(userList);
    } catch (err) {
        console.error("Error in GET /users:", err);
        res.status(500).json({ error: "Failed to fetch users"});
    }
});

export default userRouter;