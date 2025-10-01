import express from "express";
import VotesController from "../controllers/votes.controller.ts";
import validate from "../middlewares/validation.middleware.ts";
import { createVoteSchema } from "../validations/votes/create.validation.ts";

const router = express.Router();

router.post("/", validate(createVoteSchema), VotesController.create);
router.delete("/:id", VotesController.delete);

export default router;
