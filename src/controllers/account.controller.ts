import {PrismaClient, User} from '@prisma/client';
import {Request, Response} from 'express';
import {INTERNAL_SERVER_ERROR, OK, UNAUTHORISED} from '../util/responseCodes';
import {createUser, findUser} from '../repository/user.repo';
import { ResponseError } from '../util/error';
import {validatePassword} from "../util/auth";
// const prisma = new PrismaClient({log: ['query']});
const prisma = new PrismaClient({});

export const handleSignup = async (req: Request, res: Response, next: any) => {
    try {
        const {name, email, password} = req.body.signUpTO;
        const user = await createUser(name, email, password);
        res.sendStatus(OK); // return the user
    } catch (err) {
        next(err);
    }
};

export const handleLogin = async (req: Request, res: Response, next: any) => {
    try {
        const {email, password} = req.body.loginTO;
        console.log(req.body);
        console.log(email, password);
        const foundUser = await findUser(email);
        if (!foundUser) throw new ResponseError(UNAUTHORISED, 'User not found!');
        // Validate password
        if (!validatePassword(password, foundUser.password)) throw new ResponseError(UNAUTHORISED, 'Incorrect password!');
        console.log(foundUser)
        res.status(OK).json({name: foundUser.name, id: foundUser.id, userPreference: foundUser.userPreferenceId, email:foundUser.email, purchasedGames: foundUser.purchasedGames}); // return the user
    }
    catch (err) {
        next(err);
    }
}

export const handleGetUserByEmail = async (req: Request, res: Response, next: any) => {
    try {
        const {email} = req.body.accountTO;
        console.log(req.body);
        const foundUser : User = await findUser(email);
        if (!foundUser) throw new ResponseError(UNAUTHORISED, 'User not found!');
        res.status(OK).json(foundUser); // return the user
    }
    catch (err) {
        next(err);
    }
}

export const handleUpdateUser = async (req: Request, res: Response, next: any) => {};

export const handleDeleteUser = async (req: Request, res: Response, next: any) => {};

