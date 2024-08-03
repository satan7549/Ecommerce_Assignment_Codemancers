import { Router } from "express";
import {
  createProduct,
  getAllProduct,
} from "../controllers/product.controller";

const productRouter = Router();

productRouter.post("/", createProduct);

productRouter.get("/", getAllProduct);

export default productRouter;
