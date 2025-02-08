import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { AppDataSource } from "./config/db";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Запуск базы данных
AppDataSource.initialize()
  .then(() => {
    console.log("База данных подключена!");

    // Запуск сервера
    app.listen(PORT, () => {
      console.log(`Сервер запущен на http://localhost:${PORT}`);
    });
  })
  .catch((error) => console.log("Ошибка подключения к БД:", error));

