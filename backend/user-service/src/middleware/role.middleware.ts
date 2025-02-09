import { Request, Response, NextFunction } from "express";
import { AuthRequest } from "./auth.middleware";

export const roleMiddleware = (roles: string[]) => {
    return (req: AuthRequest, res: Response, next: NextFunction): void => {
        if (!req.user || !roles.includes(req.user.role)) {
            res.status(403).json({ error: "Доступ запрещён" });
            return;
        }
        next();
    };
};
