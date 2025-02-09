import { Request, Response } from "express";
import { UserService } from "./user.service";
import { AuthRequest } from "../middleware/auth.middleware";

export class UserController {
    static async getAllUsers(req: AuthRequest, res: Response): Promise<void> {
        try {
            const users = await UserService.getAllUsers();
            res.json(users);
        } catch (error) {
            res.status(500).json({ error: "Ошибка при получении списка пользователей" });
        }
    }

    static async getUser(req: AuthRequest, res: Response): Promise<void> {
        try {
            const { id, role } = req.user!;
            const userId = Number(req.params.id);

            if (id !== userId && role !== "администратор") {
                res.status(403).json({ error: "Доступ запрещён" });
                return;
            }

            const user = await UserService.getUserById(userId);
            if (!user) {
                res.status(404).json({ error: "Пользователь не найден" });
                return;
            }
            res.json(user);
        } catch (error) {
            res.status(500).json({ error: "Ошибка сервера" });
        }
    }

    static async updateUser(req: AuthRequest, res: Response): Promise<void> {
        try {
            const { id, role } = req.user!;
            const userId = Number(req.params.id);

            if (id !== userId && role !== "администратор") {
                res.status(403).json({ error: "Доступ запрещён" });
                return;
            }

            const user = await UserService.updateUser(userId, req.body);
            res.json(user);
        } catch (error) {
            res.status(500).json({ error: "Ошибка сервера" });
        }
    }

    static async deleteUser(req: AuthRequest, res: Response): Promise<void> {
        try {
            const { id, role } = req.user!;
            const userId = Number(req.params.id);

            // Разрешаем удалять себя или администратору
            if (id !== userId && role !== "администратор") {
                res.status(403).json({ error: "Доступ запрещён" });
                return;
            }

            await UserService.deleteUser(userId);
            res.json({ message: "Пользователь удалён" });
        } catch (error) {
            res.status(500).json({ error: "Ошибка сервера" });
        }
    }

}