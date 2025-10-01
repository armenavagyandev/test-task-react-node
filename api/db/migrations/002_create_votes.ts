import { pool } from "../index.ts";

class CreateVotes {
  async up() {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS votes (
            id INT AUTO_INCREMENT PRIMARY KEY,
            idea_id INT NOT NULL,
            ip_address VARCHAR(45) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            UNIQUE KEY unique_vote (idea_id, ip_address),
            FOREIGN KEY (idea_id) REFERENCES ideas(id) ON DELETE CASCADE
        )
    `);
  }

  async down() {
    await pool.query(`DROP TABLE IF EXISTS votes`);
  }
}

export default new CreateVotes();
