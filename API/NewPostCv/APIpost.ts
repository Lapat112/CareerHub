import express from "express";
import cors from "cors";
import { Pool } from "pg";

const app = express();

app.use(cors());
app.use(express.json());

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "postgres",
    password: "lapat2545",
    port: 5432,
});

// หน้าแรก
app.get("/", (req, res) => {
    res.send(" API is running");
});

app.get("/users", async (req, res) => {
    try {
        const result = await pool.query(
             'SELECT * FROM public."SearchforPersonnel"'
        );

        res.json(result.rows);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: error instanceof Error ? error.message : error,
        });
    }
});

app.listen(8000, () => {
    console.log("Server: http://localhost:8000");
});