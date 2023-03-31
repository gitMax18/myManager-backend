import { NextFunction, Request, Response } from "express";
import prisma from "../prisma/prismaClient";
import catchAsyncError from "../utils/catchAsyncError";
import { Prisma } from "@prisma/client";

export const getShoppingLists = catchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        const shoppingList = await prisma.shoppingList.findMany({
            include: {
                products: true,
            },
        });
        res.status(200).json({
            message: "all shopping lists record",
            data: shoppingList,
        });
    }
);

export const deleteShoppingList = catchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        const shoppingList = await prisma.shoppingList.delete({
            where: {
                id: +req.params.id,
            },
        });
        res.status(200).json({
            message: "Shopping list deleted",
            data: shoppingList,
        });
    }
);

export const addShoppingList = catchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        let list: Prisma.ShoppingListCreateInput;

        if (!req.body.products) {
            list = {
                name: req.body.name,
            };
        } else {
            list = {
                name: req.body.name,
                products: {
                    createMany: {
                        data: req.body.products,
                    },
                },
            };
        }

        const newList = await prisma.shoppingList.create({ data: list });
        const createdProducts = await prisma.product.findMany({
            where: {
                shoppingListId: newList.id,
            },
        });

        res.status(201).json({
            message: "New list created",
            data: {
                ...newList,
                products: createdProducts,
            },
        });
    }
);

export const updateShoppingList = catchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        console.log(req.body);
        const updatedShoppingList = await prisma.shoppingList.update({
            where: {
                id: +req.params.id,
            },
            data: {
                ...(req.body as Prisma.ShoppingListUpdateInput),
            },
        });
        res.status(200).json({
            message: "shoppingList updated",
            data: updatedShoppingList,
        });
    }
);

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
