import { User } from "@prisma/client";
import {PrismaClient} from '@prisma/client';
import {findGameById} from "./games.repo";
import { genHashPassword } from "../util/auth";
const prisma = new PrismaClient({});

export const createUser = async (name, email, password): Promise<User> => {
    // Create user
    const user = await prisma.user.create({
        data: {
            name: name,
            email: email,
            password: await genHashPassword(password),
            // No written reviews, purchased games
            writtenReviews: {},
            purchasedGames: {},
            userPreference: {
                create: {
                    isAdmin: true
                }
            }
        },
        include: {
            userPreference: true,
            purchasedGames: true,
            writtenReviews: true
        }
    })
    // hash password
    return user;
}

export const findUser = async (email: string) => {
    const foundUser = await prisma.user.findUnique({
        where: {
            email: email
        },
        include: {
            userPreference: true,
            writtenReviews: true,
            purchasedGames: true
        }
    })
    return foundUser
}

export const deleteUser = async (email: string): Promise<void> => {
    const deletedUser = await prisma.user.delete({
        where: {
            email: email
        }
    })
}
