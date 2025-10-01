import { Dispatch, SetStateAction } from "react";
import { VoteIcon } from "lucide-react";
import { Idea } from "utils/types/idea";
import ApiClient from "utils/api/api-client";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

type Props = {
  idea: Idea;
  setIdeas: Dispatch<SetStateAction<Idea[]>>;
};

const IdeaItem = ({ idea, setIdeas }: Props) => {
  const handleVoteCreate = async () => {
    try {
      const result = await ApiClient.votes.create({ idea_id: idea.id });

      setIdeas((ideas) =>
        ideas.map((item) => {
          if (item.id === idea.id) {
            return {
              ...idea,
              is_voted: true,
              votes: [...idea.votes, result.data],
            };
          }

          return item;
        }),
      );
    } catch (e: AxiosError) {
      toast(e.response.data.message, { type: "error" });
    }
  };

  const handleVoteRemove = async () => {
    try {
      const result = await ApiClient.votes.delete(idea.id);

      setIdeas((ideas) =>
        ideas.map((item) => {
          if (item.id === idea.id) {
            return {
              ...idea,
              is_voted: false,
              votes: idea.votes.filter((vote) => vote.id !== result.data.id),
            };
          }

          return item;
        }),
      );
    } catch (e: AxiosError) {
      toast(e.response.data.message, { type: "error" });
    }
  };

  return (
    <div className="w-full border border-gray-300 rounded-2xl p-2 flex items-center justify-between">
      <p>{idea.title}</p>
      <div>
        <button
          className={`flex items-center gap-2 cursor-pointer ${idea.is_voted ? "text-green-400 hover:text-green-800" : "text-gray-400 hover:text-gray-800"}`}
          onClick={idea.is_voted ? handleVoteRemove : handleVoteCreate}
        >
          <VoteIcon /> {idea.is_voted ? "Voted" : "Vote"}
          {idea.votes.length ? ` (${idea.votes.length})` : null}
        </button>
      </div>
    </div>
  );
};

export default IdeaItem;
