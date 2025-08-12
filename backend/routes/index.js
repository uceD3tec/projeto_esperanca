import express from "express";
import { instagramRouter } from "./instagramImagesR.js";
import { adminRouter } from "./adminR.js";
import { contentRouter } from "./contentR.js";

const router = express.Router();

router.use("/api/instagram", instagramRouter);
router.use("/api/admin", adminRouter);
router.use("/api/content", contentRouter);

export { router };
