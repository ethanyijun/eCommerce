import express from "express";
const router = express.Router();
import { getUsers, updateUser } from "../controllers/userController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/userlist").get(protect, admin, getUsers);
router.route("/users/:id/edit").put(protect, admin, updateUser);
export default router;
