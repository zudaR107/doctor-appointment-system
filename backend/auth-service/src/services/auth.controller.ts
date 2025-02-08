import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import jwt from "jsonwebtoken";

export class AuthController {
    static async register(req: Request, res: Response) {
        try {
            const { email, password, fullName, birthDate, phone, role } = req.body;
            const user = await AuthService.register(email, password, fullName, birthDate, phone, role);
            res.status(201).json(user);
        } catch (error) {
            res.status(400).json({ error: error instanceof Error ? error.message : "Неизвестная ошибка" });
        }
    }

    static async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            const { token, user } = await AuthService.login(email, password);
            res.json({ token, user });
        } catch (error) {
            res.status(400).json({ error: error instanceof Error ? error.message : "Неизвестная ошибка" });
        }
    }

    static async getMe(req: Request, res: Response): Promise<void> {
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader) {
                res.status(401).json({ error: "Токен отсутствует" });
                return;
            }

            const token = authHeader.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: number };

            const user = await AuthService.getMe(decoded.id);
            res.json(user);
        } catch (error) {
            res.status(401).json({ error: "Неверный или истёкший токен" });
        }
    }
}
