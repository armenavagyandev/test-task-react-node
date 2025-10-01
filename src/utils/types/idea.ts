import { Vote } from "utils/types/vote";

export type Idea = {
  id: number;
  title: string;
  votes: Vote[];
};
