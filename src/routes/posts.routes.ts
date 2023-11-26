import { handleCreatePost, handleGetAllPosts } from "../controllers/posts.controller";

const express = require('express');
const router = express.Router();

router.post('/create', handleCreatePost);
router.get('/getAllPosts', handleGetAllPosts);


export default router;
