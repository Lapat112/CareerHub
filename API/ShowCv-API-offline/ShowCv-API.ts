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
    const result = await pool.query(`SELECT  "SearchforPersonnel"."public_id" AS "HeadId", "SearchforPersonnel"."Cvlink", "CV".*  FROM public."SearchforPersonnel" JOIN public."CV"ON "SearchforPersonnel"."Cvlink" = "CV"."Id"`);

    res.json(result.rows);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "ดึงข้อมูลไม่สำเร็จ"
    });
  }
});
/* end API */













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


/* Show fix */
app.get("/fixCv/User", async (req, res) => {
  try {
    const result = await pool.query(`SELECT "SearchforPersonnel".*,"SearchforPersonnel"."Id" AS "HeadId", "SearchforPersonnel"."Cvlink", "CV".* FROM public."SearchforPersonnel" JOIN public."CV"ON "SearchforPersonnel"."Cvlink" = "CV"."Id"`);

    res.json(result.rows);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "ดึงข้อมูลไม่สำเร็จ"
    });
  }
});
/* Show fix end*/




app.delete("/History/:item_id", async (req, res) => {
  try {
    const item_id = Number(req.params.item_id);

    const result = await pool.query(
      `WITH deleted_head AS (
         DELETE FROM public."SearchforPersonnel"
         WHERE "Id" = $1
         RETURNING "Cvlink"
       )
       DELETE FROM public."CV"
       WHERE "Id" IN (SELECT "Cvlink" FROM deleted_head)`,
      [item_id]
    );

    res.json({
      message: "Delete success"
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Delete failed"
    });
  }
});


/* Update API */
app.put("/fix/putrun/:id", async (req, res) => {

  const id = Number(req.params.id);
  const { FullName, Profes, Email, address, Phon, Bio, jobName, jobLocation, jobType, salary, jobSkill } = req.body;

  console.log("PUT id :", req.params.id, "->", id);
  console.log("PUT body :", req.body);

  // ดัก id ที่ไม่ใช่ตัวเลข
  if (Number.isNaN(id)) {
    return res.status(400).json({ message: "id ไม่ถูกต้อง", gotId: req.params.id });
  }

  try {
    // 1. อัปเดต Head ก่อน และเอา Cvlink กลับมา
    const headResult = await pool.query(
      'UPDATE public."SearchforPersonnel" SET "jobName" = $1, "jobLocation" = $2, "jobType" = $3, "salary" = $4, "jobSkill" = $5 WHERE "Id" = $6 RETURNING "Cvlink"',
      [jobName, jobLocation, jobType, salary, jobSkill, id]
    );

    console.log("headResult rowCount :", headResult.rowCount);

    // ดักกรณีไม่เจอแถวของ Head
    if (headResult.rows.length === 0) {
      return res.status(404).json({ message: "ไม่พบ Head ที่ id นี้", id });
    }

    // 2. เอา Cvlink ที่ได้มา
    const cvId = headResult.rows[0].Cvlink;

    console.log("CV Id :", cvId);

    // ดักกรณี Head ไม่มี Cvlink
    if (cvId === null || cvId === undefined) {
      return res.status(400).json({ message: "Head นี้ไม่มี Cvlink", id });
    }

    // 3. เอา Cvlink ไปอัปเดต CV
    const cvResult = await pool.query(
      'UPDATE public."CV" SET "FullName" = $1, "Profes" = $2, "Email" = $3, "address" = $4, "Phon" = $5, "Bio" = $6 WHERE "Id" = $7',
      [FullName, Profes, Email, address, Phon, Bio, cvId]
    );

    console.log("cvResult rowCount :", cvResult.rowCount);

    // ดักกรณีไม่เจอแถวของ CV
    if (cvResult.rowCount === 0) {
      return res.status(404).json({ message: "ไม่พบ CV ที่ Cvlink นี้", cvId });
    }

    // 4. ส่งผลกลับ Frontend
    res.json({
      message: "แก้ไขข้อมูลสำเร็จ",
      CvId: cvId
    });

  } catch (error) {
    console.log("ERROR :", error);

    res.status(500).json({
      message: "แก้ไขข้อมูลไม่สำเร็จ",
      detail: error instanceof Error ? error.message : String(error)
    });
  }
});





app.listen(8000, () => {
  console.log("Server running at http://localhost:8000");
});