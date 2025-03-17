import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';
import User from "../model/User";
import Role from "../model/Role";

const prisma = new PrismaClient();

const SALT_ROUNDS = 10;

type UserCreateInput = {
    username: string;
    email: string;
    password: string;
    role: Role;
};

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
        let updatedData = { ...userData };
        if (userData.password) {
            const hashedPassword = await hashPassword(userData.password);
            updatedData = { ...userData, password: hashedPassword };
        }
        return await prisma.user.update({
            where: { email },
            data: updatedData,
        });
    } catch (err) {
        console.error('Error updating user:', err);
        throw new Error('Failed to update user');
    }
}

export async function deleteUser(email: string) {
    try {
        return await prisma.user.delete({
            where: { email },
        });
    } catch (err) {
        console.error('Error deleting user:', err);
        throw new Error('Failed to delete user');
    }
}
