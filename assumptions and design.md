# Personal Expense Tracker – Assumptions & Design

## 1. Assumptions

1. **Single-user system**: No authentication or multi-user support. All expenses are stored in one shared collection.
2. **Date format**: ISO format `YYYY-MM-DD` for all input dates.
3. **Currency**: Default currency is INR, but the system accepts numeric amounts without currency symbols.
4. **Categories**: Only 4 categories are supported: `food`, `travel`, `bills`, `other`.
5. **Data storage**: MongoDB is used for persistence. No local file storage is implemented.
6. **Validation**: Amount must be a positive number. Date is required. Note is optional.
7. **UI**: Simple React UI with table view, filters, and summary. CLI alternative not implemented.

## 2. Design Overview

### 2.1 Architecture

* **Frontend**: React.js

  * Components: `ExpenseForm`, `ExpenseList`, `Summary`
  * Handles CRUD operations, filters, and summary display.
  * Communicates with backend via Axios HTTP requests.

* **Backend**: Node.js + Express.js

  * RESTful API for CRUD and summary endpoints.
  * Controllers handle validation, filtering, and aggregation.
  * Routes organized in `routes/expenseRoutes.js`.

* **Database**: MongoDB

  * Collection: `expenses`
  * Schema:

    ```js
    {
      amount: Number,
      date: Date,
      note: String,
      category: "food" | "travel" | "bills" | "other"
    }
    ```

### 2.2 Features Implemented

**Must-Have:**

* Add, view, update, delete expenses.
* Save data in MongoDB.
* Basic validation & error handling.

**Good-to-Have:**

* Categories: food, travel, bills, other.
* Filters by date and category.
* Summary reports: total spent, grouped by category, grouped by month.
* Simple React UI.

## 3. Sample Inputs/Outputs

**Add Expense (POST /api/expenses):**

```json
{
  "amount": 250.5,
  "date": "2025-10-01",
  "note": "Groceries",
  "category": "food"
}
```

**Fetch Expenses (GET /api/expenses?category=food&from=2025-10-01&to=2025-10-31)**

```json
[
  {
    "_id": "652d9c3e1234567890abcd12",
    "amount": 250.5,
    "date": "2025-10-01T00:00:00.000Z",
    "note": "Groceries",
    "category": "food"
  }
]
```

**Summary by Category (GET /api/expenses/summary/category):**

```json
[
  { "category": "food", "total": 500 },
  { "category": "travel", "total": 300 }
]
```

## 4. Future Improvements

* Multi-user support with authentication.
* More dynamic category creation.
* Export data to CSV/PDF.
* More advanced UI/UX.

---

**End of Document**
