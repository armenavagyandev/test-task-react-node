import type { Vote } from "./vote.resource.ts";

export type Idea = {
  id: number;
  title: string;
  votes: Vote[];
};

class IdeaResource {
  format(idea: Idea) {
    return {
      id: idea.id,
      title: idea.title,
      votes: idea.votes ?? null,
    };
  }

  collection(ideas: Idea[]) {
    return ideas.map(this.format);
  }
}

export default new IdeaResource();
