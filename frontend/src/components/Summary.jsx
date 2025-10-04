import React, { useEffect, useState } from "react";
import { getTotal, getByCategory, getByMonth } from "../services/api";

export default function Summary() {
  const [total, setTotal] = useState(0);
  const [byCategory, setByCategory] = useState([]);
  const [byMonth, setByMonth] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const t = await getTotal();
        setTotal(t.data.total || 0);
        const c = await getByCategory();
        setByCategory(c.data);
        const m = await getByMonth();
        setByMonth(m.data);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  return (
    <div className="summary">
      <div className="summary-box">Total: ₹{Number(total).toFixed(2)}</div>
      {byCategory.map(b => (
        <div key={b.category} className="summary-box">{b.category}: ₹{Number(b.total).toFixed(2)}</div>
      ))}
      {byMonth.map(m => (
        <div key={m.month} className="summary-box">{m.month}: ₹{Number(m.total).toFixed(2)}</div>
      ))}
    </div>
  );
}
