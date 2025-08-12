import express from "express";
import { createAdmin, login } from "../controllers/adminController.js";

const adminRouter = express.Router();

adminRouter.post("/create", createAdmin); // Executar só uma vez
adminRouter.post("/login", login);

export { adminRouter };
