import express, { Application, Request, Response } from "express";
import "dotenv/config";

const app: Application = express();

const PORT = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  return res.json({
    status: 200,
    message: "App is working",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
