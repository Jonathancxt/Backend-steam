const express = require('express');
const router = express.Router();
import {PrismaClient} from '@prisma/client';
import {createWrittenReview, deleteWrittenReview, getAllWrittenReviewsByGameId, updateWrittenReview} from '../controllers/writtenreview.controller';
const prisma = new PrismaClient();

router.post('/create', createWrittenReview);
router.get('/getAllReviewByGameId', getAllWrittenReviewsByGameId)
router.post('/delete', deleteWrittenReview);
router.post('/update', updateWrittenReview);


export default router;
