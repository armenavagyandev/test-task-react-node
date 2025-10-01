import IdeasSeeder from "./seeders/ideas.seeder.ts";

class Seeder {
  async seed() {
    try {
      await IdeasSeeder.seed();
      process.exit(0);
    } catch (err) {
      console.log("seeder error: ", err);
      process.exit(1);
    }
  }
}

const seeder = new Seeder();

seeder.seed().then();
