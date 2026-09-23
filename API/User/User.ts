import express from "express";
import cors from "cors";
import { Pool } from "pg";

export const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "lapat2545",
  port: 5432,
});
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Login API"
  });
});



app.listen(8000, () => {
  console.log("Server running at http://localhost:8001");
});