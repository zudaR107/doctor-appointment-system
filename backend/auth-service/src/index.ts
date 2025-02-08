import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import "reflect-metadata";
import authRoutes from "./services/auth.routes";
import { AppDataSource } from "./config/db";
import { setupSwagger } from "./config/swagger";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
setupSwagger(app);

app.use("/api/auth", authRoutes);

AppDataSource.initialize()
    .then(() => {
        console.log("База данных подключена!");
        app.listen(5001, () => console.log("Auth Service запущен на http://localhost:5001"));
    })
    .catch((error) => console.log("Ошибка подключения к БД:", error));
