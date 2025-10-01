import express from "express";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";
import router from "./routes/index.ts";
import ErrorMiddleware from "./middlewares/error.middleware.ts";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());

app.use("/api", router);

app.use(express.static(path.join(__dirname, "../build")));

// MIDDLEWARES
app.use(ErrorMiddleware);

const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    app.listen(PORT, () => console.log(`SERVER STARTED ON PORT ${PORT}`));
  } catch (err) {
    console.log(err);
  }
};

start().then();
