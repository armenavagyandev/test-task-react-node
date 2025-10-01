import * as yup from "yup";
import express from "express";
import ApiError from "../exceptions/api-error.ts";

const validate =
  (schema: yup.AnyObjectSchema) =>
  async (
    req: express.Request,
    _: express.Response,
    next: express.NextFunction,
  ) => {
    try {
      await schema.validate(
        {
          body: req.body,
          params: req.params,
          query: req.query,
        },
        {
          abortEarly: false,
        },
      );

      next();
    } catch (err) {
      if (err && typeof err === "object" && "inner" in err) {
        const error = err.inner;

        next(
          ApiError.Error(
            422,
            "Validation Error",
            error as Record<string, unknown>,
          ),
        );
      }

      next(err);
    }
  };

export default validate;
