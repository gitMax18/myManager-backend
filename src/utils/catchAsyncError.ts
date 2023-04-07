import { Request, NextFunction, RequestHandler, Response } from "express";

export default (func: RequestHandler) => (req: Request, res: Response, next: NextFunction) => {
    return Promise.resolve(func(req, res, next)).catch(next);
};
