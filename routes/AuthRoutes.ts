import express from "express";
import { createUser, verifyUserCredentials } from "../repository/AuthRepository";
import jwt, { Secret } from "jsonwebtoken";
import dotenv from 'dotenv';
import User from "../model/User";

dotenv.config();

const router = express.Router();

router.post("/login", async (req, res) => {
    const { email, password } = req.body.user;

    try {
        const verifiedUser = await verifyUserCredentials({ email, password });

        if (verifiedUser) {
            const { email, role } = verifiedUser;  // Assuming 'verifyUserCredentials' returns an object with email and role
            const token = jwt.sign({ email, role }, process.env.SECRET_KEY as Secret, { expiresIn: "1d" });
            const refreshToken = jwt.sign({ email, role }, process.env.REFRESH_TOKEN as Secret, { expiresIn: "7d" });
            res.json({ accessToken: token, refreshToken: refreshToken });
        } else {
            res.status(403).send('Invalid credentials');
        }
    } catch (err) {
        console.error(err);
        res.status(400).send(err);
    }
});

router.post("/register", async (req, res) => {
    const { username, email, password, role } = req.body.user;

    const user: User = { username, email, password, role };

    try {
        const registration = await createUser(user);
        res.status(201).json(registration);
    } catch (err) {
        console.error(err);
        res.status(401).json(err);
    }
});

router.post("/refresh-token", async (req, res) => {
    const authHeader = req.headers.authorization;
    const refresh_token = authHeader?.split(' ')[1];

    if (!refresh_token) res.status(401).send('No token provided');

    try {
        const payload = jwt.verify(refresh_token as string, process.env.REFRESH_TOKEN as Secret) as { email: string, role: string, iat: number };
        const token = jwt.sign({ email: payload.email, role: payload.role }, process.env.SECRET_KEY as Secret, { expiresIn: "1m" });
        res.json({ accessToken: token });
    } catch (err) {
        console.error(err);
        res.status(401).json(err);
    }
});

export function authenticateToken(req: express.Request, res: express.Response, next: express.NextFunction) {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')[1];

    if (!token) res.status(401).send('No token provided');

    try {
        const payload = jwt.verify(token as string, process.env.SECRET_KEY as Secret) as { email: string, role: string, iat: number };
        req.body.email = payload.email;
        req.body.role = payload.role;
        next();
    } catch (err) {
        res.status(401).send(err);
    }
}

export default router;
