import { Router } from "express";
import {
  addToCart,
  checkoutCart,
  getCart,
} from "../controllers/cart.controller";

const cartRouter = Router();

cartRouter.post("/add", addToCart);

cartRouter.get("/", getCart);

cartRouter.post("/checkout", checkoutCart);

export default cartRouter;
