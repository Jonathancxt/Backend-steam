import {Game, PrismaClient, User} from '@prisma/client';
import {ResponseError} from '../util/error';
import {NOT_FOUND} from '../util/responseCodes';
const prisma = new PrismaClient({});

export const findGameById = async (gameId: number): Promise<Game> => {
    const foundGame = await prisma.game.findUnique({
        where: {
            id: gameId
        },
        include: {
            reviews: true,
            purchasedUsers: true
        }
    });
    if (!foundGame) return null;

    return foundGame;
};

export const findGameByTitle = async (gameTitle: string): Promise<Game> => {
    const foundGame = await prisma.game.findFirst({
        where: {
            title: gameTitle
        }
    });
    if (!foundGame) return null;

    return foundGame;
};

// To be used for search
export const findAllGames = async (): Promise<Game[]> => {
    const foundGames = await prisma.game.findMany({
        include: {
            reviews: true,
            purchasedUsers: true
        }
    });
    if (!foundGames) return [];

    return foundGames;
}

export const createGame = async (title: string, description: string, image_url: string, developer: string, releaseDate: string, responsive_reviewdesc:string, averageRating: number): Promise<Game> => {
    const newGame : Game = await prisma.game.create({
        data: {
            title: title,
            description: description,
            image_url: image_url,
            developer: developer,
            releaseDate: releaseDate,
            responsive_reviewdesc: responsive_reviewdesc,
            averageRating: averageRating,
            reviews: {}
        }
    });

    return newGame;
};

// Update there is some more complex issue
export const updateAverageRating = async (gameId: number): Promise<Game> => {
    const foundGame = await findGameById(gameId);
    if (!foundGame) throw new ResponseError(NOT_FOUND, 'Game not found');

    // TODO: Add logic
    return foundGame;
};

export const addGameToUser = async (email: string, gameId: number): Promise<User> => {
    // Find games based on name or id
    const foundGame = await findGameById(gameId)
    // Find User
    const updatedUser = await prisma.user.update({
        where: {
            email: email
        },
        data: {
            purchasedGames: {
                connect: {
                    id: gameId
                }
            }
        },
        include: {
            userPreference: true,
            writtenReviews: true,
            purchasedGames: true
        }
    })

    return updatedUser
}

export const removeGameFromUser = async (email: string, gameId: number): Promise<User> => {
    // Find games based on name or id
    const foundGame = await findGameById(gameId)
    // Find User
    const updatedUser = await prisma.user.update({
        where: {
            email: email
        },
        data: {
            purchasedGames: {
                disconnect: {
                    id: gameId
                }
            }
        },
        include: {
            userPreference: true,
            writtenReviews: true,
            purchasedGames: true
        }
    })

    return updatedUser
}

export const removeGameFromDB = async (gameId: number): Promise<void> => {
    // Apparently, this cascades to all users that has the game
    await prisma.game.delete({
        where: {
            id: gameId
        }
    })
}









