import { NextFunction, Request, Response } from "express";
import prisma from "../prisma/prismaClient";
import catchAsyncError from "../utils/catchAsyncError";
import { Prisma } from "@prisma/client";

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
                shoppingRows: {
                    createMany: {
                        data: req.body.products,
                    },
                },
            };
        }

        const newList = await prisma.shoppingList.create({ data: list });
        const createdProducts = await prisma.shoppingRow.findMany({
            where: {
                shoppingListId: newList.id,
            },
        });

        res.status(201).json({
            data: {
                shoppingList: newList,
                products: createdProducts,
            },
        });
    }
);
