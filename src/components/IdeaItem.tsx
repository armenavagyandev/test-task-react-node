import { Dispatch, SetStateAction } from "react";
import { VoteIcon } from "lucide-react";
import { Idea } from "utils/types/idea";
import ApiClient from "utils/api/api-client";

type Props = {
  idea: Idea;
  setIdeas: Dispatch<SetStateAction<Idea[]>>;
};

const IdeaItem = ({ idea, setIdeas }: Props) => {
  const handleVoteClick = async () => {
    const result = await ApiClient.votes.create({ idea_id: idea.id });

    setIdeas((ideas) =>
      ideas.map((item) => {
        if (item.id === idea.id) {
          return {
            ...idea,
            votes: [...idea.votes, result.data],
          };
        }

        return item;
      }),
    );
  };

  return (
    <div className="w-full border border-gray-300 rounded-2xl p-2 flex items-center justify-between">
      <p>{idea.title}</p>
      <div>
        <button
          className="flex items-center gap-2 cursor-pointer text-gray-400 hover:text-gray-800"
          onClick={handleVoteClick}
        >
          <VoteIcon /> Vote
          {idea.votes.length ? ` (${idea.votes.length})` : null}
        </button>
      </div>
    </div>
  );
};

export default IdeaItem;
