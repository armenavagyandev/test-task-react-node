import { pool } from "../index.ts";

export class CreateIdeas {
  async up() {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS ideas (
            id INT AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(255) NOT NULL
        )
    `);
  }

  async down() {
    await pool.query(`DROP TABLE IF EXISTS ideas`);
  }
}

export default new CreateIdeas();
