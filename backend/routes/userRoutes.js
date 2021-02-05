import express from "express";
const router = express.Router();
import {
  authUser,
  getUserProfile,
  createUser,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

router.post("/login", authUser);
router.route("/profile").get(protect, getUserProfile);
router.route("/").post(createUser);

export default router;
