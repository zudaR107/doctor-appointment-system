import { User } from "./user.entity";
import { AppDataSource } from "../config/db";
import axios from "axios";

const userRepository = AppDataSource.getRepository(User);

export class UserService {
    static async getUserById(id: number) {
        return await userRepository.findOne({ where: { id } });
    }

    static async getAllUsers(role?: string) {
        if (role) {
            return await userRepository.find({ where: { role } });
        }
        return await userRepository.find();
    }

    static async getUserAppointments(id: number) {
        try {
            const response = await axios.get(`http://localhost:5003/api/appointments/user/${id}`);
            return response.data;
        } catch (error) {
            throw new Error("Ошибка при получении записей пользователя");
        }
    }

    static async updateUser(id: number, updateData: Partial<User>) {
        const user = await userRepository.findOne({ where: { id } });
        if (!user) {
            throw new Error("Пользователь не найден");
        }
        await userRepository.update(id, updateData);
        return await userRepository.findOne({ where: { id } });
    }

    static async deleteUser(id: number) {
        const user = await userRepository.findOne({ where: { id } });
        if (!user) {
            throw new Error("Пользователь не найден");
        }
        await userRepository.delete(id);
        return { message: "Пользователь удалён" };
    }
}
