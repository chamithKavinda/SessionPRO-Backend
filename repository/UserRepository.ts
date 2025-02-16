import { PrismaClient } from "@prisma/client";
import User from "../model/User";
import Role from "../model/Role";

const prisma = new PrismaClient();

type UserCreateInput = {
    username: string;
    email: string;
    password: string;
    role: Role;
};

export async function createUser(userData: UserCreateInput) {
    try {
        return await prisma.user.create({
            data: userData,
        });
    } catch (err) {
        console.error('Error creating user:', err);
        throw new Error('Failed to create user');
    }
}
