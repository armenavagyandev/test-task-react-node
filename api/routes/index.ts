import express from "express";
import votesRouter from "./votes.router.ts";
import ideasRouter from "./ideas.router.ts";

const router = express.Router();

router.use("/votes", votesRouter);
router.use("/ideas", ideasRouter);

export default router;
