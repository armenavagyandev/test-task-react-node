import express from "express";
import ApiError from "../exceptions/api-error.ts";

export default (
  err: unknown,
  _req: express.Request,
  res: express.Response,
  next: express.NextFunction,
): void => {
  if (err instanceof ApiError) {
    res.status(err.status).send({ message: err.message, errors: err.errors });
  }

  console.error(err);

  res.status(500).send("Server Error");
};
