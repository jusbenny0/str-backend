import express from "express";
import {
  createMeal,
  fetchMealsByUser,
  deleteMeal
} from "../controllers/meal.controller.js";
const router = express.Router();

router.post("/create", createMeal);
router.get("/:userID", fetchMealsByUser);
router.delete("/:mealID", deleteMeal);


export default router;
