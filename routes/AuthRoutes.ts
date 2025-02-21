import express from "express";
import {createUser, verifyUserCredentials} from "../repository/AuthRepository";
import User from "../model/User";
import jwt, {Secret} from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

router.post("/login", async (req, res) => {
    const { email, password } = req.body.user;

    const user: { email: any; password: any } = { email, password };

    try {
        const isVerified = await verifyUserCredentials(user);

        if (isVerified) {
            const token = jwt.sign({ email }, process.env.SECRET_KEY as Secret, { expiresIn: "1d" });
            const refreshToken = jwt.sign({ email }, process.env.REFRESH_TOKEN as Secret, { expiresIn: "7d" });
            res.json({ accessToken: token, refreshToken: refreshToken });
        } else {
            res.sendStatus(403).send('Invalid credentials');
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
        const payload = jwt.verify(refresh_token as string, process.env.REFRESH_TOKEN as Secret) as { email: string, iat: number };
        const token = jwt.sign({ email: payload.email }, process.env.SECRET_KEY as Secret, { expiresIn: "1m" });
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
        const payload = jwt.verify(token as string, process.env.SECRET_KEY as Secret) as { email: string, iat: number };
        req.body.email = payload.email;
        next();
    } catch (err) {
        res.status(401).send(err);
    }
}

export default router;
