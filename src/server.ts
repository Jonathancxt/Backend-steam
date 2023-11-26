import userRoutes from './routes/account.routes';
import gamesRoutes from './routes/games.routes';
import reviewsRoutes from './routes/writtenreview.routes';
import postsRoutes from './routes/posts.routes';

import {PrismaClient} from '@prisma/client';
import {errorHandlerMiddleware} from './middlewares/errorhandler.middleware';
import { oneTimeLoadSteamGames } from './util/steamGamesDataLoading';
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_DATABASE_URL;
const prisma = new PrismaClient({});
const corsOptions = require('./config/cors/corsOptions');


const app = express();
app.use(cors(corsOptions));

app.use(express.json());
app.use('/account', userRoutes);
app.use('/games', gamesRoutes);
app.use('/reviews', reviewsRoutes);
app.use('/posts', postsRoutes);

// Remove this line after running once
oneTimeLoadSteamGames()
    .catch((e) => {
        console.log(e);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

// Global error handler
app.use(errorHandlerMiddleware);

mongoose
    .connect(MONGO_URL)
    .then((res: any) => {
        console.log('Server has connected to mongoDB');
    })
    .catch((error: any) => {
        console.log(error);
    });

app.listen(PORT, () => console.log(`listening to port ${PORT} `)); // This port should be in env
