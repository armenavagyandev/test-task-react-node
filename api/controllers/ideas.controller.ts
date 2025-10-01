import express from "express";
import IdeasService from "../services/ideas.service.ts";
import IdeaResource from "../resources/idea.resource.ts";
import type { Idea } from "../resources/idea.resource.ts";
import VotesService from "../services/votes.service.ts";

class IdeasController {
  async index(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    try {
      const ip = VotesService.getIP(req);

      const ideas = await IdeasService.index(ip);

      res.send(IdeaResource.collection(ideas as Idea[]));
    } catch (err) {
      next(err);
    }
  }
}

export default new IdeasController();
