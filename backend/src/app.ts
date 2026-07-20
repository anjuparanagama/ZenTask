import express from "express";
import cors from "cors";
import path from "path";
import fs from "fs";

import authRoutes from "./routes/auth.routes";
import dashboardRoutes from "./routes/dashboard.controllers";
import taskRoutes from "./routes/task.routes";

const app = express();

app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);

app.use(express.json());

const publicPath = fs.existsSync(path.join(__dirname, "public", "index.html"))
  ? path.join(__dirname, "public", "index.html")
  : path.join(process.cwd(), "src/public/index.html");

app.get("/", (_req, res) => {
  res.sendFile(publicPath);
});

app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/tasks", taskRoutes);

export default app;
