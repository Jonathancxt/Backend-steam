import {Request, Response} from 'express';
import {INTERNAL_SERVER_ERROR, OK, UNAUTHORISED} from '../util/responseCodes';
import { ResponseError } from '../util/error';
import { createNewReview, deleteReview, findReviewByGame, updateReview } from '../repository/writtenreviews.repo';

export const createWrittenReview = async (req: Request, res: Response, next: any) => {
    try {
        const {averageRating, content, authorId, gameId, gameTitle} = req.body.reviewTO;
        console.log(req.body.reviewTO)
        if (!content || !authorId || !gameId) throw new ResponseError(UNAUTHORISED, 'Invalid request!');
        const newReview = await createNewReview(authorId, gameId, content, averageRating, gameTitle);
        if (!newReview) throw new ResponseError(INTERNAL_SERVER_ERROR, 'Internal Server Error!')
        res.status(OK).json(newReview);
    } catch (err) {
        next(err);
    }
};

export const updateWrittenReview = async (req: Request, res: Response, next: any) => {
    try {
        const {id, content, averageRating} = req.body.reviewTO;
        console.log("id", id)
        console.log("content", content)
        console.log("averageRating", averageRating)
        if (!id || !content) throw new ResponseError(UNAUTHORISED, 'Invalid request!');
        console.log("next")
        const updatedReview = await updateReview(id, content, averageRating);
        if (!updatedReview) throw new ResponseError(INTERNAL_SERVER_ERROR, 'Internal Server Error!')
        res.status(OK).json(updatedReview);
    } catch (err) {
        next(err);
    }
};

export const deleteWrittenReview = async (req: Request, res: Response, next: any) => {
    try {
        const {id} = req.body.reviewTO;
        if (!id) throw new ResponseError(UNAUTHORISED, 'Invalid request!');
        const deletedReview = await deleteReview(id);
        if (!deletedReview) throw new ResponseError(INTERNAL_SERVER_ERROR, 'Internal Server Error!')
        res.sendStatus(OK);
    } catch (err) {
        next(err);
    }
};


export const getAllWrittenReviewsByGameId = async (req: Request, res: Response, next: any) => {
    try {
        const {gameId} = req.body.reviewTO;
        if (!gameId) throw new ResponseError(UNAUTHORISED, 'Invalid request!');
        const allReviews = await findReviewByGame(gameId);
        if (!allReviews) throw new ResponseError(INTERNAL_SERVER_ERROR, 'Internal Server Error!')
        res.status(OK).json(allReviews);
    } catch (err) {
        next(err);
    }
};
