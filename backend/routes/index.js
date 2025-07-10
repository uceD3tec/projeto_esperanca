import express from "express";
import { instagramRouter } from "./instagramImagesR.js";

const router = express.Router();

router.use("/api", instagramRouter);

export { router };
