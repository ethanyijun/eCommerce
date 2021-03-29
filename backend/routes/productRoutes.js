import express from "express";
const router = express.Router();
import {
  getProductById,
  getProducts,
  deleteProductById,
  createProduct,
  updateProduct,
} from "../controllers/productController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").get(getProducts);
router.route("/").post(protect, admin, createProduct);

router
  .route("/:id")
  .get(getProductById)
  .delete(protect, admin, deleteProductById)
  .put(protect, admin, updateProduct);

export default router;
