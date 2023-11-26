import {addGameToUserEmail, getAllGames, getGameById, removeGameFromDatabase} from "../controllers/games.controller";
import {createGame, findGameById, findGameByTitle, removeGameFromUser} from "../repository/games.repo";

const express = require('express');
const router = express.Router();
import {PrismaClient} from '@prisma/client';
const prisma = new PrismaClient();

router.post('/getGameById', getGameById)
router.get('/getAllGames', getAllGames);
router.get('getGameByTitle', findGameByTitle);
router.post('/create', createGame);
router.delete('/deleteFromUser', removeGameFromUser );
router.delete('/deleteFromDatabase', removeGameFromDatabase);
router.post('/addGameToUser', addGameToUserEmail);

export default router;
