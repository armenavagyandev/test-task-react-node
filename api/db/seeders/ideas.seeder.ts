import { pool } from "../index.ts";

export const ideas = [
  "Добавить чат с поддержкой",
  "Интеграция с соцсетями",
  "Новые уровни сложности",
  "Система наград за прогресс",
  "Поддержка мультиплатформенности",
];

class IdeasSeeder {
  async seed() {
    for (const title of ideas) {
      await pool.query("INSERT INTO ideas(title) VALUES(?)", [title]);
    }
  }
}

export default new IdeasSeeder();
