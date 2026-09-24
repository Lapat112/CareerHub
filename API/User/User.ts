import express, { Request, Response } from "express";
import cors from "cors";
import { Pool } from "pg";
import bcrypt from "bcrypt";

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

app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "Login API",
  });
});







/* Register zone */
interface RegisterBody {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

app.post("/register", async (req: Request<{}, {}, RegisterBody>, res: Response) => {
  try {
    const { firstname, lastname, email, password } = req.body;

    if (!firstname || !lastname || !email || !password) {
      return res.status(400).json({
        message: "กรอกข้อมูลให้ครบ",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = `INSERT INTO public."User" ("Firstname", "Lastname", "Emailaddress", "Password") VALUES ($1, $2, $3, $4)`;

    await pool.query(sql, [firstname, lastname, email, hashedPassword]);

    res.json({
      message: "User Success",
    });
  } catch (err: any) {
    res.status(500).json({
      message: err.message,
    });
  }
});
/* END Register zone */






/* login zone */
app.post("/login", async (req: Request, res: Response) => {
    const email = req.body.email;
    const password = req.body.password;

    const sql = `SELECT * FROM public."User" WHERE "Emailaddress" = $1`;

    try {
        const result = await pool.query(sql, [email]);
        const row = result.rows[0];


        if (!row) {
            return res.json({
                message: "Name or Password incorrect"
            });
        }

        const isMatch = await bcrypt.compare(password, row.Password);

           if (isMatch) {
            res.json({
                message: "Login Success"
            });
        } else {
            res.json({
                message: "Name or Password incorrect"
            });
        }
     
    } catch (err: any) {
        console.error("Login error:", err);
        res.status(500).json({
            message: err.message
        });
    }
});

/* END login zone */


app.listen(8000, () => {
  console.log("Server running at http://localhost:8000");
});