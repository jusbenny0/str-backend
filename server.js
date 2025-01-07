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

// CORS configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL,       // allow only your frontend origin
  methods: "GET,POST,PUT,DELETE,OPTIONS",  // include OPTIONS for preflight
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"], // adjust as needed
};

app.use(cors(corsOptions));

// Explicitly handle preflight OPTIONS requests for all routes
app.options("*", cors(corsOptions));

console.log("Frontend URL:", process.env.FRONTEND_URL);

// Define routes after CORS middleware
app.use("/api/auth", authRoutes); 
app.use("/api/user", userRoutes); 
app.use("/api/meals", mealRoutes);

// Test endpoint
app.use("/api/test", (req, res) => {
  res.json({
    message: "This is a test endpoint.",
    success: true,
  });
});

// Connect to MongoDB
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

// Start the server
const server = app.listen(3000, () => {
  console.log("API is running on port 3000");
});
