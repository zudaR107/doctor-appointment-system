import { DataSource } from "typeorm";
import dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: ["src/services/*.entity.ts"],
    synchronize: true,
});

export const connectDB = async () => {
    try {
        await AppDataSource.initialize();
        console.log("База данных подключена!");
    } catch (error) {
        console.error("Ошибка подключения к БД:", error);
    }
};