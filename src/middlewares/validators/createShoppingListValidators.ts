import { Request, Response, NextFunction } from "express";
import HttpException from "../../utils/HttpException";

export default (req: Request, res: Response, next: NextFunction) => {
    if (!req.body.name || typeof req.body.name !== "string") {
        throw new HttpException("validation error", 400, {
            name: "Value name is required",
        });
    }

    if (req.body.products) {
        const products = req.body.products;
        if (!Array.isArray(products)) {
            throw new HttpException("validation error", 400, {
                products: "Invalid format",
            });
        }
        products.forEach((product, index) => {
            if (!product["product"] || !product["quantity"]) {
                throw new HttpException("validation error", 400, {
                    products: "Invalid data keys for product at : " + index,
                });
            }
            if (typeof product["product"] !== "string" || typeof product["quantity"] !== "number") {
                throw new HttpException("validation error", 400, {
                    products: "Invalid data value for product at : " + index,
                });
            }
        });
    }

    next();
};
