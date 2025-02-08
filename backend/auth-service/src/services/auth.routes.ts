import { Router } from "express";
import { AuthController } from "./auth.controller";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Аутентификация и авторизация
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Регистрация пользователя
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - fullName
 *               - birthDate
 *               - phone
 *               - role
 *             properties:
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 example: "securepassword"
 *               fullName:
 *                 type: string
 *                 example: "Иван Иванов"
 *               birthDate:
 *                 type: string
 *                 format: date
 *                 example: "1990-05-15"
 *               phone:
 *                 type: string
 *                 example: "+79001234567"
 *               role:
 *                 type: string
 *                 enum: ["пациент", "врач", "администратор"]
 *                 example: "пациент"
 *     responses:
 *       201:
 *         description: Успешная регистрация
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 email:
 *                   type: string
 *                   example: "user@example.com"
 *                 fullName:
 *                   type: string
 *                   example: "Иван Иванов"
 *                 birthDate:
 *                   type: string
 *                   format: date
 *                   example: "1990-05-15"
 *                 phone:
 *                   type: string
 *                   example: "+79001234567"
 *                 role:
 *                   type: string
 *                   example: "пациент"
 *       400:
 *         description: Ошибка валидации
 */
router.post("/register", AuthController.register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Вход в систему
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 example: "securepassword"
 *     responses:
 *       200:
 *         description: Успешная авторизация
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1..."
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     email:
 *                       type: string
 *                       example: "user@example.com"
 *                     fullName:
 *                       type: string
 *                       example: "Иван Иванов"
 *                     birthDate:
 *                       type: string
 *                       format: date
 *                       example: "1990-05-15"
 *                     phone:
 *                       type: string
 *                       example: "+79001234567"
 *                     role:
 *                       type: string
 *                       example: "пациент"
 *       400:
 *         description: Неверные данные
 */
router.post("/login", AuthController.login);

/**
 * @swagger
 * /api/auth/me:
 *   get:
 *     summary: Получение информации о пользователе
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Данные авторизованного пользователя
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 email:
 *                   type: string
 *                   example: "user@example.com"
 *                 fullName:
 *                   type: string
 *                   example: "Иван Иванов"
 *                 birthDate:
 *                   type: string
 *                   format: date
 *                   example: "1990-05-15"
 *                 phone:
 *                   type: string
 *                   example: "+79001234567"
 *                 role:
 *                   type: string
 *                   enum: ["пациент", "врач", "администратор"]
 *                   example: "пациент"
 *       401:
 *         description: Неавторизованный доступ
 */
router.get("/me", AuthController.getMe);


export default router;
