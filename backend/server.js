import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import expenseRoutes from "./routes/expenseRoutes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// routes
app.use("/api/expenses", expenseRoutes);

// global error handler (simple)
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
});

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  } catch (err) {
    console.error("Failed to start server:", err);
  }
};

start();
