import { pool } from "../db/index.ts";
import type { Idea } from "../resources/idea.resource.ts";

class IdeasService {
  async index(ip: string) {
    const [rows] = await pool.query(`
      SELECT
      ideas.id,
      ideas.title,
      COALESCE(
        JSON_ARRAYAGG(
          CASE
          WHEN votes.id IS NOT NULL THEN JSON_OBJECT(
            'id', votes.id,
            'ip_address', votes.ip_address,
            'created_at', votes.created_at
          )
          END
        ),
        JSON_ARRAY()
      ) AS votes
      FROM ideas
      LEFT JOIN votes ON ideas.id = votes.idea_id
      GROUP BY ideas.id, ideas.title
      ORDER BY ideas.id
    `);

    return (rows as Idea[]).map((row) => ({
      id: row.id,
      title: row.title,
      votes: row.votes.filter(Boolean),
      is_voted: row.votes.some((item) => item.ip_address === ip),
    }));
  }
}

export default new IdeasService();
