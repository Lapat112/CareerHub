import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Hello World"
  });
});

app.listen(8000, () => {
  console.log("Server running at http://localhost:8000");
});