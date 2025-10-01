import { pool } from "../index.ts";

export const ideas = [
  "Add live chat support",
  "Integrate with social media",
  "New difficulty levels",
  "Progress reward system",
  "Cross-platform support",
  "Dark mode interface",
  "User profile customization",
  "Push notifications",
  "Offline mode",
  "Multi-language support",
  "AI-powered recommendations",
  "In-app tutorials",
  "Gamification with badges",
  "Leaderboard for top users",
  "Customizable themes",
  "Cloud sync across devices",
  "Quick search functionality",
  "Advanced analytics dashboard",
  "Collaborative features for teams",
  "Export data as CSV or PDF",
  "Integration with calendar apps",
  "Voice commands support",
  "Enhanced security features",
  "Weekly challenges or quests",
  "In-app messaging system",
  "Automated reminders",
  "Drag-and-drop interface",
  "Social sharing of achievements",
  "Feedback and rating system",
  "Personalized user dashboard",
  "Mobile widgets",
];

class IdeasSeeder {
  async seed() {
    for (const title of ideas) {
      await pool.query("INSERT INTO ideas(title) VALUES(?)", [title]);
    }
  }
}

export default new IdeasSeeder();
