import mongoose from "mongoose";
import express from "express";
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import mealRoutes from "./routes/meal.route.js";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();
app.use(cookieParser());
app.use(express.json());

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

console.log(process.env.FRONTEND_URL);

app.use("/api/auth", authRoutes); 
app.use("/api/user", userRoutes); 
app.use("/api/test", (req, res) => {
  res.json({
    message: "This is a test endpoint.",
    success: true,
  });
});
app.use("/api/meals", mealRoutes)

mongoose
  .connect(process.env.MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

const server = app.listen(3000, () => {
  console.log("API is running on port 3000");
});