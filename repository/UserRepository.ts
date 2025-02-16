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

export async function getAllUsers() {
    try {
        return await prisma.user.findMany();
    } catch (err) {
        console.error("Error fetching users:", err);
        throw new Error("Failed to fetch users from the repository");
    }
}

type UserUpdateInput = Partial<UserCreateInput> & { email: string };

export async function updateUser(email: string, userData: { username: any; password: any; role: any }) {
    try {
        return await prisma.user.update({
            where: { email },
            data: userData,
        });
    } catch (err) {
        console.error('Error updating user:', err);
        throw new Error('Failed to update user');
    }
}
