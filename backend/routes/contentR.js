import express from "express";
import {
  createContent,
  updateContent,
  deleteContent,
  getBySection,
} from "../controllers/contentController.js";

import { authMiddleware } from "../middlewares/authMiddleware.js";
import { upload } from "../middlewares/uploadMiddleware.js";

const contentRouter = express.Router();

contentRouter.get("/:section", getBySection);
contentRouter.post("/", authMiddleware, upload.single("image"), createContent);
contentRouter.put(
  "/:id",
  authMiddleware,
  upload.single("image"),
  updateContent
);
contentRouter.delete(
  "/:id",
  authMiddleware,
  upload.single("image"),
  deleteContent
);

export { contentRouter };
