import { NextFunction, Request, Response } from "express";
import catchAsyncError from "../utils/catchAsyncError";
import prisma from "../prisma/prismaClient";
import getHashPassword from "../utils/getHashPassword";
import HttpException from "../utils/HttpException";
import bcrypt from "bcrypt";
import getJwtToken from "../utils/getJwtToken";

export const registerUser = catchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        const hashedPassword = await getHashPassword(req.body.password);
        const newUser = await prisma.user.create({
            data: {
                email: req.body.email,
                password: hashedPassword,
            },
        });

        const token = getJwtToken(newUser.id);

        res.status(201).json({
            message: "User created",
            data: {
                token,
                id: newUser.id,
            },
        });
    }
);

export const loginUser = catchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        const user = await prisma.user.findFirst({
            where: {
                email: req.body.email,
            },
        });

        if (!user) {
            throw new HttpException("invalid user data", 400);
        }

        const isUserValid = await bcrypt.compare(req.body.password, user.password);

        if (!isUserValid) {
            throw new HttpException("invalid user data", 400);
        }

        const token = getJwtToken(user.id);

        res.status(200).json({
            message: "User authentified",
            data: {
                token,
                id: user.id,
            },
        });
    }
);
