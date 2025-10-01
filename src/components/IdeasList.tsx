import { useEffect, useState } from "react";
import ApiClient from "utils/api/api-client";
import { Idea } from "utils/types/idea";
import IdeaItem from "components/IdeaItem";

const IdeasList = () => {
  const [ideas, setIdeas] = useState<Idea[]>([]);

  useEffect(() => {
    ApiClient.ideas.index().then((res) => setIdeas(res.data));
  }, []);

  return (
    <div className="w-full flex flex-col gap-2 py-5 px-2">
      {ideas.map((idea) => (
        <IdeaItem key={idea.id} idea={idea} setIdeas={setIdeas} />
      ))}
    </div>
  );
};

export default IdeasList;
