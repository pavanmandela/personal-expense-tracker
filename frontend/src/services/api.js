import axios from "axios";
const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api"
});

export const fetchExpenses = (params) => API.get("/expenses", { params });
export const addExpense = (data) => API.post("/expenses", data);
export const updateExpense = (id, data) => API.put(`/expenses/${id}`, data);
export const deleteExpense = (id) => API.delete(`/expenses/${id}`);

export const getTotal = () => API.get("/expenses/summary/total");
export const getByCategory = () => API.get("/expenses/summary/category");
export const getByMonth = () => API.get("/expenses/summary/month");
