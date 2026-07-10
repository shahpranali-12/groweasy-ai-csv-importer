import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import importRoutes from "./routes/importRoutes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("GrowEasy Backend is Running 🚀");
});

app.use("/api/import", importRoutes);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});