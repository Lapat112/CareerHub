import express from "express";
import cors from "cors";
import { Pool } from "pg";
import multer from "multer";
import { createClient } from "@supabase/supabase-js";

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






/*get SearchforPersonnel API */
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

/*post SearchforPersonnel API */


/* Cv API */
app.get("/ShowCv/User", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        "SearchforPersonnel"."Id" AS "HeadId",
        "SearchforPersonnel"."Cvlink",
        "CV".*
      FROM public."SearchforPersonnel"
      JOIN public."CV"
        ON "SearchforPersonnel"."Cvlink" = "CV"."Id"
    `);

    res.json(result.rows);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "ดึงข้อมูลไม่สำเร็จ"
    });
  }
});
/* end API */





/* Post CV API */


app.post("/Upload", async (req, res) => {

  const { FullName, Profes, Email, address, Phon, Bio, jobName, jobLocation, jobType, salary, jobSkill, userId } = req.body;

  try {
    // 1. สร้าง CV ก่อน
    const cvResult = await pool.query(
      'INSERT INTO public."CV" ("FullName", "Profes", "Email", "address", "Phon", "Bio") VALUES ($1, $2, $3, $4, $5, $6) RETURNING "Id"',
      [FullName, Profes, Email, address, Phon, Bio]
    );

    // 2. เอา Id ของ CV ที่เพิ่งสร้าง
    const newId = cvResult.rows[0].Id;

    console.log("CV new Id :", newId);

    // 3. เอา Id ไปใส่ Cvlink ตอนสร้าง Head
    await pool.query(
      'INSERT INTO public."SearchforPersonnel" ("jobName","jobLocation","jobType","salary","jobSkill","Usercreate","Cvlink") VALUES ($1, $2, $3, $4, $5, $6, $7)',
      [ jobName, jobLocation, jobType, salary, jobSkill, userId, newId]);

    // 4. ส่งผลกลับ Frontend
    res.json({
      message: "เพิ่มข้อมูลสำเร็จ",
      CvId: newId
    });

  } catch (error) {
    console.log("ERROR :", error);

    res.status(500).json({
      message: "เพิ่มข้อมูลไม่สำเร็จ"
    });
  }
});








/*history API */
app.get("/History/users", async (req, res) => {
  try {
    const userId = req.query.Id;

    if (userId){
      console.log("get Id")
    }else{
      return res.status(400).json({
        messge: "Dont get id"
      });
    }

    const result = await pool.query( `SELECT *FROM public."SearchforPersonnel" WHERE "Usercreate" = $1`,
      [userId]
    );

    res.json(result.rows);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "ดึงข้อมูลไม่สำเร็จ"
    });
  }
});
/* end history API */









app.listen(8000, () => {
  console.log("Server running at http://localhost:8000");
});