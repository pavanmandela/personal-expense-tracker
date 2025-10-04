import React from "react";

export default function ExpenseList({ expenses, onEdit, onDelete }) {
  if (!expenses.length) return <div>No expenses yet</div>;
  return (
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr>
          <th>Date</th><th>Amount</th><th>Category</th><th>Note</th><th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {expenses.map(e => (
          <tr key={e._id}>
            <td>{new Date(e.date).toISOString().slice(0,10)}</td>
            <td>₹{e.amount.toFixed(2)}</td>
            <td>{e.category}</td>
            <td>{e.note}</td>
            <td>
              <button onClick={() => onEdit(e)}>Edit</button>
              <button onClick={() => onDelete(e._id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
