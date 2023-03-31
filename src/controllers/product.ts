import { Prisma } from "@prisma/client";
import prisma from "../prisma/prismaClient";
import catchAsyncError from "../utils/catchAsyncError";
import { NextFunction, Request, Response } from "express";

export const addProduct = catchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;

        const product = await prisma.product.create({
            data: {
                shoppingListId: +id,
                ...req.body,
            },
        });

        res.status(201).json({
            message: "product added",
            data: product,
        });
    }
);

export const updateProduct = catchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        const updatedProduct = await prisma.product.update({
            where: {
                id: +req.params.id,
            },
            data: {
                ...(req.body as Prisma.ProductUpdateInput),
            },
        });

        res.status(200).json({
            message: "Product updated",
            data: updatedProduct,
        });
    }
);

export const deleteProduct = catchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        const product = await prisma.product.delete({
            where: {
                id: +req.params.id,
            },
        });
        res.status(200).json({
            message: "product deleted",
            data: product,
        });
    }
);
