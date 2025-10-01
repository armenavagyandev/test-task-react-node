import * as yup from "yup";

const createVoteSchema = yup.object({
  body: yup.object({
    idea_id: yup.number().required(),
  }),
});

type CreateVoteBody = yup.InferType<typeof createVoteSchema>["body"];

export { createVoteSchema };
export type { CreateVoteBody };
