import Expense from "../models/Expense.js";

// GET /api/expenses?from=YYYY-MM-DD&to=YYYY-MM-DD&category=food
export const getExpenses = async (req, res) => {
  try {
    const { from, to, category } = req.query;
    const query = {};

    if (category) query.category = category;
    if (from || to) {
      query.date = {};
      if (from) query.date.$gte = new Date(from);
      if (to) query.date.$lte = new Date(to);
    }

    const expenses = await Expense.find(query).sort({ date: -1 });
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /api/expenses
export const addExpense = async (req, res) => {
  try {
    const { amount, date, note, category } = req.body;
    if (amount == null || !date) return res.status(400).json({ error: "amount and date are required" });

    const parsedAmount = Number(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) return res.status(400).json({ error: "amount must be a positive number" });

    const expense = new Expense({
      amount: parsedAmount,
      date: new Date(date),
      note,
      category
    });

    const saved = await expense.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PUT /api/expenses/:id
export const updateExpense = async (req, res) => {
  try {
    const updates = req.body;
    if (updates.amount != null) {
      const parsed = Number(updates.amount);
      if (isNaN(parsed) || parsed <= 0) return res.status(400).json({ error: "amount must be a positive number" });
      updates.amount = parsed;
    }
    if (updates.date) updates.date = new Date(updates.date);

    const updated = await Expense.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!updated) return res.status(404).json({ error: "Expense not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE /api/expenses/:id
export const deleteExpense = async (req, res) => {
  try {
    const deleted = await Expense.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Expense not found" });
    res.json({ message: "Expense deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* ---------------- Summary endpoints ---------------- */

// GET /api/expenses/summary/total
export const getTotalSpent = async (req, res) => {
  try {
    const result = await Expense.aggregate([
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);
    res.json({ total: result[0]?.total || 0 });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/expenses/summary/category
export const getByCategory = async (req, res) => {
  try {
    const result = await Expense.aggregate([
      { $group: { _id: "$category", total: { $sum: "$amount" } } }
    ]);
    // map to nicer format
    res.json(result.map(r => ({ category: r._id, total: r.total })));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/expenses/summary/month
export const getByMonth = async (req, res) => {
  try {
    const result = await Expense.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m", date: "$date" } },
          total: { $sum: "$amount" }
        }
      },
      { $sort: { _id: 1 } }
    ]);
    res.json(result.map(r => ({ month: r._id, total: r.total })));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
