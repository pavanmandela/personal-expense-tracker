import React, { useEffect, useState } from "react";
import { fetchExpenses, addExpense, updateExpense, deleteExpense } from "./services/api";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import Summary from "./components/Summary";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [editing, setEditing] = useState(null);
  const [filters, setFilters] = useState({ from: "", to: "", category: "" });

  const load = async () => {
    try {
      const params = {};
      if (filters.from) params.from = filters.from;
      if (filters.to) params.to = filters.to;
      if (filters.category) params.category = filters.category;
      const res = await fetchExpenses(params);
      setExpenses(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { load(); }, []); // initial load

  const handleAdd = async (payload) => {
    const res = await addExpense(payload);
    setExpenses(prev => [res.data, ...prev]);
  };

  const handleUpdate = async (id, payload) => {
    const res = await updateExpense(id, payload);
    setExpenses(prev => prev.map(e => e._id === id ? res.data : e));
    setEditing(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this expense?")) return;
    await deleteExpense(id);
    setExpenses(prev => prev.filter(e => e._id !== id));
  };

  const applyFilters = () => load();

  const resetFilters = () => {
    setFilters({ from: "", to: "", category: "" });
    load();
  };

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: 20 }}>
      <h1>Personal Expense Tracker</h1>

      <ExpenseForm onAdd={handleAdd} editing={editing} onCancel={() => setEditing(null)} onUpdate={handleUpdate} />

      <div style={{ marginBottom: 12 }}>
        <label>From: <input type="date" value={filters.from} onChange={e => setFilters({...filters, from: e.target.value})} /></label>
        <label>To: <input type="date" value={filters.to} onChange={e => setFilters({...filters, to: e.target.value})} /></label>
        <label>Category:
          <select value={filters.category} onChange={e => setFilters({...filters, category: e.target.value})}>
            <option value="">All</option>
            <option value="food">food</option>
            <option value="travel">travel</option>
            <option value="bills">bills</option>
            <option value="other">other</option>
          </select>
        </label>
        <button onClick={applyFilters}>Apply</button>
        <button onClick={resetFilters}>Reset</button>
      </div>

      <ExpenseList expenses={expenses} onEdit={setEditing} onDelete={handleDelete} />

      <Summary />
    </div>
  );
}

export default App;
