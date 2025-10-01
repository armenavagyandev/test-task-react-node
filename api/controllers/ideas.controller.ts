import express from "express";
import IdeasService from "../services/ideas.service.ts";
import IdeaResource from "../resources/idea.resource.ts";
import type { Idea } from "../resources/idea.resource.ts";

class IdeasController {
  async index(
    _: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    try {
      const ideas = await IdeasService.index();

      res.send({
        data: IdeaResource.collection(ideas as Idea[]),
      });
    } catch (err) {
      next(err);
    }
  }
}

export default new IdeasController();
