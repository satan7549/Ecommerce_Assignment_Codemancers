import { Router } from "express";
import {
  addToCart,
  checkoutCart,
  getCart,
  removeFromCart,
} from "../controllers/cart.controller";

const cartRouter = Router();

cartRouter.post("/add", addToCart);

cartRouter.get("/", getCart);

cartRouter.delete("/remove", removeFromCart);

cartRouter.post("/checkout", checkoutCart);

export default cartRouter;
