import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/connectDB.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();
const port = process.env.PORT || 8080;

// Database connection
connectDB();

// Middleware
app.use(express.json());

// Configure CORS to allow access from all origins
app.use(cors({
  origin: "*", // Allow all origins
  methods: "GET,POST,PUT,DELETE,PATCH,OPTIONS",
  allowedHeaders: "Content-Type,Authorization",
}));

app.use(cookieParser());

// Import routes
import jobRoutes from "./routes/jobRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";
import recruiterRoutes from "./routes/recruiterRoutes.js";
import fileUploadRoute from './routes/fileUploadRoute.js';
import Auth from './routes/Auth.js';

// Use routes
app.use("/jobs", jobRoutes);
app.use("/users", userRoutes);
app.use("/application", applicationRoutes);
app.use("/recruiter", recruiterRoutes);
app.use("/", fileUploadRoute);
app.use("/auth", Auth);

// Routes
app.get("/", (req, res) => {
  res.send("Hello, world!");
});

// Handle undefined routes
app.get("*", (req, res) => {
  res.redirect("/");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
