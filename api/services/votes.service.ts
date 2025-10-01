import { pool } from "../db/index.ts";
import type { Vote } from "../resources/vote.resource.ts";
import ApiError from "../exceptions/api-error.ts";
import type { ResultSetHeader, RowDataPacket } from "mysql2";
import express from "express";

class VotesService {
  async create(idea_id: number, ip_address: string): Promise<Vote> {
    const [countRows] = await pool.query<RowDataPacket[]>(
      `SELECT COUNT(DISTINCT idea_id) AS count 
       FROM votes 
       WHERE ip_address = ?`,
      [ip_address],
    );

    if (countRows?.[0]?.count >= 10) {
      throw ApiError.Error(403, "You can't vote more than 10 times.");
    }

    const [existing] = await pool.query<RowDataPacket[]>(
      `SELECT id FROM votes WHERE idea_id = ? AND ip_address = ?`,
      [idea_id, ip_address],
    );

    if (existing.length > 0) {
      throw ApiError.Error(403, "Already voted for this idea");
    }

    const [insertResult] = await pool.query<ResultSetHeader>(
      `INSERT INTO votes (idea_id, ip_address) VALUES (?, ?)`,
      [idea_id, ip_address],
    );

    return {
      id: insertResult.insertId,
      ip_address,
      created_at: new Date(),
    };
  }

  async delete(id: number, ip: string): Promise<Vote> {
    const [rows] = await pool.query<RowDataPacket[]>(
      `SELECT * FROM votes WHERE idea_id = ? AND ip_address = ?`,
      [id, ip],
    );

    const [result] = await pool.query<ResultSetHeader>(
      `DELETE FROM votes WHERE idea_id = ? AND ip_address = ?`,
      [id, ip],
    );

    if (result.affectedRows === 0) {
      throw ApiError.Error(404, "Vote not found");
    }

    return rows?.[0] as Vote;
  }

  getIP(req: express.Request<unknown, unknown, unknown>) {
    const ipHeader = req.headers["x-forwarded-for"];
    let ip =
      typeof ipHeader === "string"
        ? ipHeader.split(",")[0].trim()
        : (req.socket.remoteAddress ?? "unknown");

    if (ip.startsWith("::ffff:")) {
      ip = ip.substring(7);
    }

    return ip;
  }
}

export default new VotesService();
