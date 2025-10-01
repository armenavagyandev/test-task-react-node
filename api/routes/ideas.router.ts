import express from "express";
import IdeasController from "../controllers/ideas.controller.ts";

const router = express.Router();

router.get("/", IdeasController.index);

export default router;
