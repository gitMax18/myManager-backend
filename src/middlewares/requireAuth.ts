import { NextFunction, Request, Response } from "express";
import catchAsyncError from "../utils/catchAsyncError";
import HttpException from "../utils/HttpException";
import jwt from "jsonwebtoken";
import prisma from "../prisma/prismaClient";

export default catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const bearerToken = req.headers.authorization;

    if (!bearerToken) {
        throw new HttpException("Your are not loged in", 401);
    }
    const token = bearerToken?.split(" ")[1];

    if (!token) {
        throw new HttpException("Your are not loged in", 401);
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET!);
    if (typeof payload === "string") {
        throw new HttpException("Your are not loged in", 401);
    }

    if (!payload.id) {
        throw new HttpException("Your are not loged in", 401);
    }

    const user = await prisma.user.findUnique({
        where: {
            id: payload.id,
        },
    });

    if (!user) {
        throw new HttpException("Your are not loged in", 401);
    }

    req.userId = user.id;

    next();
});
