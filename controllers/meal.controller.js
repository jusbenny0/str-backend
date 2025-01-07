
import Meal from "../models/meals.model.js";

export const createMeal = async (req, res, next) => {
  const {
    userID,
    name,
    serving_size_g,
    calories,
    protein_g,
    carbohydrates_total_g,
    fat_total_g,
    fiber_g,
  } = req.body;

  if (
    !userID ||
    !name ||
    serving_size_g === undefined ||
    calories === undefined ||
    protein_g === undefined ||
    carbohydrates_total_g === undefined ||
    fat_total_g === undefined ||
    fiber_g === undefined
  ) {
    return res
      .status(400)
      .json({ message: "Please provide all required fields." });
  }

  try {
    const newMeal = new Meal({
      userID,
      name,
      serving_size_g,
      calories,
      protein_g,
      carbohydrates_total_g,
      fat_total_g,
      fiber_g,
    });

    const savedMeal = await newMeal.save();
    res.status(201).json(savedMeal);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Server error. Could not save meal entry." });
  }
};

export const fetchMealsByUser = async (req, res, next) => {
  const { userID } = req.params;

  try {
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

    const meals = await Meal.find({
      userID,
      createdAt: { $gte: twentyFourHoursAgo },
    }).sort({ createdAt: -1 });

    res.status(200).json(meals);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Server error. Could not retrieve meals." });
  }
};

export const deleteMeal = async (req, res, next) => {
  const { mealID } = req.params;
  const { userID } = req.body;

  try {
    const meal = await Meal.findOne({ _id: mealID, userID });

    if (!meal) {
      return res.status(404).json({ message: "Meal not found." });
    }

    await Meal.deleteOne({ _id: mealID });

    res.status(200).json({ message: "Meal deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error. Could not delete meal." });
  }
};
