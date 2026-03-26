import express from "express";
import routes from "./routes.js";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

const app = express();

app.use(cors({ origin: FRONTEND_URL }));
app.use(express.json());
app.use('', routes);

const distPath = path.join(__dirname, "../frontend/dist");
app.use(express.static(distPath));
app.get("*", (_req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
});

export default app;
