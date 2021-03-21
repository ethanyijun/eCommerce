import express from "express";
const router = express.Router();
import {
  authUser,
  getUserProfile,
  createUser,
  updateUserProfile,
  getUsers,
  deleteUser,
} from "../controllers/userController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.post("/login", authUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router.route("/").post(createUser).get(protect, admin, getUsers);
router.route("/:id").delete(protect, admin, deleteUser);

export default router;
