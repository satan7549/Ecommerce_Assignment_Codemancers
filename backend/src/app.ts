import express, { Request, Response, Application } from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes";

const app: Application = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello");
});

// Import All Routes Below
app.use("/user", userRoutes);

export default app;
