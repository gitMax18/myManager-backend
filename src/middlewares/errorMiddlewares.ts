import { NextFunction, Request, Response } from "express";

export default (err: any, req: Request, res: Response, next: NextFunction) => {
    res.status(err.statusCode || 500).json({
        message: err.message,
        details: err.details || null,
    });
};
