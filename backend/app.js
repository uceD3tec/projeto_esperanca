import cors from "cors";
import express from "express";
import { router } from "./routes/index.js";
import { connectDB } from "./config/database.js";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();

app.use(cors({}));
app.use(express.json());
app.use("/uploads", express.static(path.resolve(__dirname, "public/uploads")));

connectDB();

app.use(router);

export { app };
