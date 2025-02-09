import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import userRoutes from "./services/user.routes";
import { setupSwagger } from "./config/swagger";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

setupSwagger(app);
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 5002;

app.listen(PORT, async () => {
    await connectDB();
    console.log(`User Service запущен на http://localhost:${PORT}`);
});