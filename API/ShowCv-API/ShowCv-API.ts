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
    message: "Hello World"
  });
});

app.get("/users", async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM public."SearchforPersonnel"');

    res.json(result.rows);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "ดึงข้อมูลไม่สำเร็จ"
    });
  }
});

app.get("/ShowCv/User", async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM public."SearchforPersonnel" JOIN public."CV" ON "SearchforPersonnel"."Cvlink_id" = "CV"."Id";');

    res.json(result.rows);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "ดึงข้อมูลไม่สำเร็จ"
    });
  }
});



app.listen(8000, () => {
  console.log("Server running at http://localhost:8000");
});