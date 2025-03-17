import { PrismaClient } from '@prisma/client';
import bcrypt from "bcrypt";
import Role from "../model/Role";

const prisma = new PrismaClient();
const SALT_ROUNDS = 10;

type UserCreateInput = {
    username: string;
    email: string;
    password: string;
    role: Role; 
};

function convertToRole(role: string): Role {
    if (role === "ADMIN") {
        return Role.ADMIN;
    } else {
        return Role.USER;
    }
}

async function hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, SALT_ROUNDS);
}

export async function createUser(userData: UserCreateInput) {
    try {
        const hashedPassword = await hashPassword(userData.password);
        const userWithHashedPassword = { ...userData, password: hashedPassword };
        return await prisma.user.create({
            data: userWithHashedPassword,
        });
    } catch (err) {
        console.error('Error creating user:', err);
        throw new Error('Failed to create user');
    }
}

export async function verifyUserCredentials(verifyUser: { email: any; password: any }) {
    const user = await prisma.user.findUnique({
        where: { email: verifyUser.email },
    });

    if (!user) {
        return null;
    }

    const isPasswordValid = await bcrypt.compare(verifyUser.password, user.password);

    if (!isPasswordValid) {
        return null;
    }

    return { email: user.email, role: convertToRole(user.role) };
}

