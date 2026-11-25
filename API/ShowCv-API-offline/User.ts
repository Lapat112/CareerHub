import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import { Pool } from "pg";
import bcrypt from "bcrypt";
import rateLimit from "express-rate-limit";
import jwt from "jsonwebtoken";
import process from "process";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";


dotenv.config();

const loginLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 นาที
  max: 5,              // Login ได้สูงสุด 5 ครั้ง
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many login attempts. Please try again later.",
  },
});

export const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "lapat2545",
  port: 5432,
});

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

const jw_t = process.env.jw_t!;
const REFRESH_SECRET = process.env.REFRESH_SECRET!;

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

app.post("/register", loginLimiter, async (req: Request<{}, {}, RegisterBody>, res: Response) => {
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
app.post("/login", loginLimiter, async (req: Request, res: Response) => {
  const email = req.body.email;
  const password = req.body.password;

  const sql = `SELECT * FROM public."User" WHERE "Emailaddress" = $1`;

  try {
    const result = await pool.query(sql, [email]);
    const row = result.rows[0];

    if (!row) {
      return res.json({
        message: "Name or Password incorrect",
      });
    }

    const isMatch = await bcrypt.compare(password, row.Password);

    if (isMatch) {

      /* Access Token */
      const token = jwt.sign(
        { id: row.U_Id },
        jw_t,
        { expiresIn: "1m" }
      );

      res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 60 * 1000,
      });


      
      /* Refresh Token */
      const refreshToken = jwt.sign(
        { id: row.U_Id },
        REFRESH_SECRET,
        { expiresIn: "1d" }
      );

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 1 * 24 * 60 * 60 * 1000,
      });

      return res.json({
        message: "Login Success",
        firstName: row.Firstname,
        Idonttallyou: row.U_Id,
      });

    } else {
      return res.json({
        message: "Name or Password incorrect",
      });
    }

  } catch (err: any) {
    console.error("Login error:", err);

    if (res.headersSent) {
      return;
    }

    return res.status(500).json({
      message: err.message,
    });
  }
});
/* END login zone */


/* Refresh token zone */
app.post("/refresh", (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({
      message: "Refresh Token not found",
    });
  }

  try {
    const decoded = jwt.verify(
      refreshToken,
      REFRESH_SECRET
    ) as { id: number };

    const newAccessToken = jwt.sign(
      { id: decoded.id },
      jw_t,
      { expiresIn: "1m" }
    );

    res.cookie("token", newAccessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 60 * 1000,
    });

    return res.json({
      message: "Access Token Renewed",
    });

  } catch (err) {
    return res.status(401).json({
      message: "Invalid or Expired Refresh Token",
    });
  }
});
/* END Refresh token zone */




/* Auth middleware */
const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Access token missing" });
  }

  try {
    const payload = jwt.verify(token, jw_t) as { id: number };
    (req as any).userId = payload.id;
    next();
  } catch {
    return res.status(401).json({ message: "Access token invalid or expired" });
  }
};


app.get("/profile", authMiddleware, (req: Request, res: Response) => {
  res.json({ userId: (req as any).userId });
});








/* Logout zone */
app.post("/logout", (req: Request, res: Response) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    path: "/",
  });

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    path: "/",
  });

  res.status(200).json({
    message: "Logout Success",
  });
});
/* END Logout zone */


app.listen(7000, () => {
  console.log("Server running at http://localhost:7000");
});