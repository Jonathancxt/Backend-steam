import {Request, Response} from 'express';
import {INTERNAL_SERVER_ERROR, OK, UNAUTHORISED} from '../util/responseCodes';
import { ResponseError } from '../util/error';
import {createGame, findAllGames, findGameById, removeGameFromDB, removeGameFromUser, addGameToUser} from "../repository/games.repo";

// export const createNewGame = async (req: Request, res: Response, next: any) => {
//     try {
//         const {title, description, image, averageRating} = req.body;
//         if (!title || !description || !image || !averageRating) throw new ResponseError(UNAUTHORISED, 'Invalid request!');
//         const newGame = await createGame(title, description, image, averageRating);
//         if (!newGame) throw new ResponseError(INTERNAL_SERVER_ERROR, 'Internal Server Error!')
//         res.status(OK).json(newGame);
//     } catch (err) {
//         next(err);
//     }
// };

export const updateGame = async (req: Request, res: Response, next: any) => {
    try {
    } catch (err) {
        next(err);
    }
};

export const removeGameFromUserGames = async (req: Request, res: Response, next: any): Promise<void> => {
    try {
        const {email, gameId} = req.body.gameTO;
        if (!email || !gameId) throw new ResponseError(UNAUTHORISED, 'Invalid request!');
        await removeGameFromUser(email, gameId);
        res.sendStatus(OK);
    }
    catch (err) {
        next(err);
    }
}
export const removeGameFromDatabase = async (req: Request, res: Response, next: any) => {
    try {
        const {id} = req.body.gameTO;
        if (!id) throw new ResponseError(UNAUTHORISED, 'Invalid request!');
        await removeGameFromDB(id);
        res.sendStatus(OK);
    } catch (err) {
        next(err);
    }
};

export const getAllGames = async (req: Request, res: Response, next: any) => {
    try {
        console.log("Getting all games")
        const allGames = await findAllGames();
        console.log("All games", allGames)
        if (!allGames) throw new ResponseError(INTERNAL_SERVER_ERROR, 'Internal Server Error!')
        res.status(OK).json(allGames);

    } catch (err) {
        next(err);
    }
}

export const addGameToUserEmail = async (req: Request, res: Response, next: any) => {
    try {
        const {email, gameId} = req.body.gameTO
        if (!email || !gameId) throw new ResponseError(UNAUTHORISED, 'Invalid request!');
        const updatedUser = await addGameToUser(email, gameId);
        res.status(OK).json(updatedUser);
    } catch (err) {
        next(err);
    }
}

export const getGameById = async (req: Request, res: Response, next: any) => {
    try {
        const {id} = req.body.gameTO;
        console.log("id", id)
        if (!id) throw new ResponseError(UNAUTHORISED, 'Invalid request!');
        const game = await findGameById(id);
        if (!game) throw new ResponseError(INTERNAL_SERVER_ERROR, 'Internal Server Error!')
        res.status(OK).json(game);
    } catch (err) {
        next(err);
    }
}
