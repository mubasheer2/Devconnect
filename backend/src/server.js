import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";

import uploadRoute from "./routes/upload.route.js";
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import chatRoutes from "./routes/chat.route.js";

import { connectDB } from "./lib/db.js";

const app = express();

const PORT = process.env.PORT || 5001;

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow karo agar origin hai hi nahi (Postman etc) ya vercel ka URL hai
      if (!origin || origin.includes("vercel.app") || origin === "http://localhost:5173") {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/upload", uploadRoute);

app.get("/", (req, res) => {
  res.send("Backend is running...");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});