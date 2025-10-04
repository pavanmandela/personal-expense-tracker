import React, { useState, useEffect } from "react";

const CATEGORIES = ["food", "travel", "bills", "other"];

export default function ExpenseForm({ onAdd, editing, onCancel, onUpdate }) {
  const [form, setForm] = useState({ amount: "", date: "", note: "", category: "other" });

  useEffect(() => {
    if (editing) {
      setForm({
        amount: editing.amount,
        date: new Date(editing.date).toISOString().slice(0,10),
        note: editing.note || "",
        category: editing.category || "other"
      });
    }
  }, [editing]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.amount || !form.date) return alert("Amount and date required");
    const payload = { ...form, amount: Number(form.amount) };
    if (editing) {
      await onUpdate(editing._id, payload);
    } else {
      await onAdd(payload);
    }
    setForm({ amount: "", date: "", note: "", category: "other" });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 16 }}>
      <input name="amount" type="number" step="0.01" placeholder="Amount" value={form.amount} onChange={handleChange} required />
      <input name="date" type="date" value={form.date} onChange={handleChange} required />
      <input name="note" placeholder="Note" value={form.note} onChange={handleChange} />
      <select name="category" value={form.category} onChange={handleChange}>
        {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
      </select>
      <button type="submit">{editing ? "Update" : "Add"}</button>
      {editing && <button type="button" onClick={onCancel}>Cancel</button>}
    </form>
  );
}
