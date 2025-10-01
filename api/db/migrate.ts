import CreateIdeas from "./migrations/001_create_ideas.ts";
import CreateVotes from "./migrations/002_create_votes.ts";

class Migration {
  private readonly migrations: {
    up: () => Promise<void>;
    down: () => Promise<void>;
  }[];

  constructor() {
    this.migrations = [CreateIdeas, CreateVotes];
  }

  async migrate() {
    for (const m of this.migrations) {
      await m.up();
    }

    process.exit(0);
  }

  async rollback() {
    for (const m of [...this.migrations].reverse()) {
      await m.down();
    }

    process.exit(0);
  }
}

const runner = new Migration();

const action = process.argv[2];

if (action === "down") {
  runner.rollback().then();
} else {
  runner.migrate().then();
}
