import express from "express";
import {
  test,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";
import { verifyPassword } from "../controllers/auth.controller.js";

const router = express.Router();

router.get("/", test);
router.post("/update/:id", updateUser);
router.delete("/delete/:id", deleteUser);
router.post("/verifyPassword", verifyPassword)
router.get("/verify", verifyToken, (req, res) => {
  res.status(200).json({ isValid: true });
});

export default router;
