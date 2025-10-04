# Personal Expense Tracker

A **MERN stack** web application to manage personal expenses efficiently. Users can **add, edit, delete, filter expenses**, and view summaries for better financial tracking.

---

## Features

* Add, edit, and delete expenses
* Filter expenses by date range or category
* View total spent, monthly spending, and category-wise breakdown
* Responsive UI built with React
* Backend API built with Express.js and MongoDB

---

## Tech Stack

* Frontend: React.js, CSS
* Backend: Node.js, Express.js
* Database: MongoDB
* State Management: React Hooks
* HTTP Requests: Axios

---

## Project Structure

```
personal-expense-tracker/
├─ backend/
│  ├─ models/Expense.js
│  ├─ controllers/expenseController.js
│  ├─ routes/expenseRoutes.js
│  ├─ .env
│  ├─ .gitignore
│  ├─ package.json
│  └─ server.js
├─ frontend/
│  ├─ src/
│  │  ├─ components/ExpenseForm.jsx
│  │  ├─ components/ExpenseList.jsx
│  │  ├─ components/Summary.jsx
│  │  ├─ services/api.js
│  │  ├─ App.js
│  │  └─ index.js
│  └─ package.json
└─ README.md
```

---

## Installation

### Backend

```bash
cd backend
npm install
cp .env
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

---

## API Endpoints

* `GET /api/expenses` – List expenses (supports query params: from, to, category)
* `POST /api/expenses` – Add expense
* `PUT /api/expenses/:id` – Edit expense
* `DELETE /api/expenses/:id` – Delete expense
* `GET /api/expenses/summary/total` – Get total spent
* `GET /api/expenses/summary/category` – Get spending by category
* `GET /api/expenses/summary/month` – Get spending by month

---

## Usage

* Add new expenses using the form
* Edit or delete existing expenses in the table
* Apply filters to view expenses by date or category
* View summary of total, monthly, and category spending

---

## Author

**Mandela Durga Pavan Kumar**

* GitHub: [https://github.com/pavanmandela]
* Email: [durgapavankumarmandela2005@gmail.com]

---

