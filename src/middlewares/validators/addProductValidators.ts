import { NextFunction, Request, Response } from "express";
import HttpException from "../../utils/HttpException";

export default (req: Request, res: Response, next: NextFunction) => {
    const product = req.body;

    if (!product["name"] || !product["quantity"]) {
        throw new HttpException("validation error", 400, {
            products: "Invalid data keys for product",
        });
    }
    if (typeof product["name"] !== "string" || typeof product["quantity"] !== "number") {
        throw new HttpException("validation error", 400, {
            products: "Invalid data value for product",
        });
    }

    next();
};
