import express from "express";
import VotesService from "../services/votes.service.ts";
import VoteResource from "../resources/vote.resource.ts";
import type { CreateVoteBody } from "../validations/votes/create.validation.ts";

class VotesController {
  async create(
    req: express.Request<unknown, unknown, CreateVoteBody>,
    res: express.Response,
    next: express.NextFunction,
  ) {
    try {
      const { idea_id } = req.body;

      const ip = VotesService.getIP(req);

      const vote = await VotesService.create(idea_id, ip);

      res.status(201).send(VoteResource.format(vote));
    } catch (err) {
      next(err);
    }
  }

  async delete(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ): Promise<void> {
    try {
      const { id } = req.params;

      const ip = VotesService.getIP(req);

      await VotesService.delete(Number(id), ip);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
}

export default new VotesController();
