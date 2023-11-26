import {handleLogin, handleDeleteUser,handleSignup, handleUpdateUser, handleGetUserByEmail} from "../controllers/account.controller";

const express = require('express');
const router = express.Router();
import {PrismaClient} from '@prisma/client';
const prisma = new PrismaClient();

router.post('/signup', handleSignup);
router.post('/login', handleLogin);
router.post('/update', handleUpdateUser );
router.post('/delete', handleDeleteUser);
router.post('/getUserByEmail', handleGetUserByEmail);

export default router;

