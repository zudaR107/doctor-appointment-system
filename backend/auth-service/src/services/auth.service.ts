import { User } from "./auth.entity";
import { AppDataSource } from "../config/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userRepository = AppDataSource.getRepository(User);

export class AuthService {
    static async register(email: string, password: string, fullName: string, birthDate: string, phone: string, role: string) {
        const existingUser = await userRepository.findOne({ where: { email } });

        if (existingUser) {
            throw new Error("Email уже используется");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = userRepository.create({ email, password: hashedPassword, fullName, birthDate, phone, role });
        await userRepository.save(user);

        return user;
    }

    static async login(email: string, password: string) {
        const user = await userRepository.findOne({ where: { email } });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new Error("Неверные данные");
        }

        const token = jwt.sign(
            { id: user.id, email: user.email, fullName: user.fullName, role: user.role },
            process.env.JWT_SECRET!,
            { expiresIn: "24h" }
        );

        return { token, user };
    }

    static async getMe(userId: number) {
        const user = await userRepository.findOne({ where: { id: userId } });

        if (!user) {
            throw new Error("Пользователь не найден");
        }

        return user;
    }
}
