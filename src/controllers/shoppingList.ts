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

        const newList = await prisma.shoppingList.create({
            data: list,
            include: {
                products: true,
            },
        });

        res.status(201).json({
            message: "New list created",
            data: newList,
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
            include: {
                products: true,
            },
        });
        // const products = await prisma.product.findMany({
        //     where: {
        //         shoppingListId: updatedShoppingList.id,
        //     },
        // });
        res.status(200).json({
            message: "shoppingList updated",
            data: updatedShoppingList,
        });
    }
);
