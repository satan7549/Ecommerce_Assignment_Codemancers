import express, { Request, Response, Application } from "express";
import cors from "cors";
import userRoutes from "./routes/user.routes";
import isUserAuthenticated from "./middleware/user.auth";
import productRouter from "./routes/product.routes";

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
app.use(isUserAuthenticated);
app.use("/product", productRouter);

export default app;
