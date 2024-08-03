import express, { Request, Response, Application } from "express";
import cors from "cors";
import userRoutes from "./routes/user.routes";
import productRouter from "./routes/product.routes";
import { isUserAuthenticated } from "./middleware/user.auth";
import cartRouter from "./routes/cart.routes";

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
app.use("/cart", cartRouter);

export default app;
