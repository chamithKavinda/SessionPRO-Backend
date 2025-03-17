import { Router } from "express";
import { createUser, getAllUsers, updateUser, deleteUser } from "../repository/UserRepository";

const userRouter = Router();

userRouter.post("/", async (req, res) => {
    try {
        const newUser = req.body;
        const user = await createUser(newUser);
        res.status(201).json(user);
    } catch (err) {
        if (err instanceof Error && err.message.includes("Unique constraint")) {
            res.status(400).json({ error: "User email already exists" });
        } else {
            console.error("Error in POST /user:", err);
            res.status(500).json({ error: "Failed to create user" });
        }
    }
});

userRouter.get("/", async (req, res) => {
    try {
        const userList = await getAllUsers();
        res.json(userList);
    } catch (err) {
        console.error("Error in GET /users:", err);
        res.status(500).json({ error: "Failed to fetch users" });
    }
});

userRouter.put('/:email', async (req, res) => {
    try {
        const email = req.params.email;
        const { username, password, role } = req.body;

        const updatedUser = { username, password, role };
        console.log("Received update data:", updatedUser);

        const user = await updateUser(email, updatedUser);
        res.status(200).json(user);
    } catch (err) {
        console.error('Error in PUT /user:', err);
        res.status(500).json({ error: 'Failed to update user' });
    }
});

userRouter.delete('/:email', async (req, res) => {
    try {
        const email = req.params.email;

        await deleteUser(email);
        res.status(204).send();
    } catch (err) {
        console.error('Error in DELETE /user:', err);
        res.status(500).json({ error: 'Failed to delete user' });
    }
});

export default userRouter;
