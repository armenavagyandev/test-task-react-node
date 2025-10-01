export type Vote = {
  id: number;
  ip_address: string;
  created_at: Date;
};

class VoteResource {
  format(vote: Vote) {
    return {
      id: vote.id,
      ip_address: vote.ip_address,
      created_at: vote.created_at,
    };
  }
}

export default new VoteResource();
