import {PrismaClient} from '@prisma/client';
const prisma = new PrismaClient({});

export const findReviewById = async (id: number) => {
    const foundReview = await prisma.review.findUnique({
        where: {
            id: id
        }
    })
    return foundReview
}

export const findReviewByGame = async (gameId: number) => {
const foundReview = await prisma.review.findMany({
        where: {
            gameId: gameId
        }
    })
    return foundReview
}

export const findReviewByUser = async (authorId: number) => {
    const foundReview = await prisma.review.findMany({
        where: {
            authorId: authorId
        }
    })
    return foundReview
}

export const createNewReview = async (authorId: number, gameId: number, content: string, averageRating: number, gameTitle:string) => {
    console.log("authorId", authorId)
    console.log("gameId", gameId)
    console.log("content", content)
    console.log("averageRating", averageRating)
    console.log("gameTitle", gameTitle)

    const newReview = await prisma.review.create({
        data: {
            authorId: authorId,
            gameId: gameId,
            content: content,
            averageRating: averageRating,
            gameTitle: gameTitle
        }
    })
    return newReview
}

export const deleteReview = async (id: number) => {
    const deletedReview = await prisma.review.delete({
        where: {
            id: id
        }
    })
    return deletedReview
}

export const updateReview = async (id: number, content: string, averageRating: number) => {
    const updatedReview = await prisma.review.update({
        where: {
            id: id
        },
        data: {
            content: content,
            averageRating: averageRating
        }
    })
    return updatedReview
}

