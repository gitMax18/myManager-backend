import { Request, NextFunction, RequestHandler, Response } from "express";

export default (func: RequestHandler) => (req: Request, res: Response, next: NextFunction) => {
    return Promise.resolve(func(req, res, next)).catch(next);
};

// export default (callback: RequestHandler) => {
//     return (req: Request, res: Response, next: NextFunction) => {
//         try {
//             callback(req, res, next);
//         } catch (err) {
//             next(err);
//         }
//     };
// };
