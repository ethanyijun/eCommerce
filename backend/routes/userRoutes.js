import express from "express";
const router = express.Router();
import {
  authUser,
  getUserProfile,
  createUser,
  updateUserProfile,
  getUsers,
} from "../controllers/userController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.post("/login", authUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router.route("/").post(createUser).get(protect, admin, getUsers);

export default router;
