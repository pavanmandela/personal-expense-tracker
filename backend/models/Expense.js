import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
  amount: { type: Number, required: true, min: 0 },
  date: { type: Date, required: true },
  note: { type: String, trim: true },
  category: {
    type: String,
    enum: ["food", "travel", "bills", "other"],
    default: "other"
  }
}, { timestamps: true });

export default mongoose.model("Expense", expenseSchema);
