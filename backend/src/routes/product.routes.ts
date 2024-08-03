import { Router } from "express";
import {
  createProduct,
  getAllProduct,
  getProductById,
  updateProduct,
} from "../controllers/product.controller";
import { isAdmin } from "../middleware/user.auth";

const productRouter = Router();

productRouter.get("/", getAllProduct);

productRouter.get("/:id", getProductById);

productRouter.post("/", isAdmin, createProduct);

productRouter.put("/:id", isAdmin, updateProduct);

export default productRouter;
