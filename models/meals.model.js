// models/Meal.js

import mongoose from "mongoose";

const { Schema, Types } = mongoose;

// Define the Meal Schema
const mealSchema = new Schema(
  {
    userID: {
      type: Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    serving_size_g: {
      type: Number,
      required: true,
      min: [0, "Serving size must be a positive number"],
    },
    calories: {
      type: Number,
      required: true,
      min: [0, "Calories must be a positive number"],
    },
    protein_g: {
      type: Number,
      required: true,
      min: [0, "Protein must be a positive number"],
    },
    carbohydrates_total_g: {
      type: Number,
      required: true,
      min: [0, "Carbohydrates must be a positive number"],
    },
    fat_total_g: {
      type: Number,
      required: true,
      min: [0, "Fats must be a positive number"],
    },
    fiber_g: {
      type: Number,
      required: true,
      min: [0, "Fiber must be a positive number"],
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Create and export the Meal model
const Meal = mongoose.model("Meal", mealSchema);

export default Meal;
