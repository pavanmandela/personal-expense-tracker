import express from "express";
import {
  getExpenses, addExpense, updateExpense, deleteExpense,
  getTotalSpent, getByCategory, getByMonth
} from "../controllers/expenseController.js";

const router = express.Router();

router.get("/", getExpenses);
router.post("/", addExpense);
router.put("/:id", updateExpense);
router.delete("/:id", deleteExpense);

// summary endpoints
router.get("/summary/total", getTotalSpent);
router.get("/summary/category", getByCategory);
router.get("/summary/month", getByMonth);

export default router;
