# Expense Tracker

A full-stack expense tracking dashboard built with React, CSS, Express, and MongoDB. The app lets users register/login, add income and expense transactions, view financial totals, filter recent expenses by date range, and inspect a category-wise spending report powered by a MongoDB aggregation pipeline.

## Deployment URLs

Update these after deployment:

- Frontend: `https://expense-tracker-six-iota-pivj289u41.vercel.app/`
- Backend API: `https://expense-tracker-z1o0.onrender.com/`

## Core Features

- Dashboard with total income, total expense, and available balance.
- Add income and add expense flows connected to the backend create transaction API.
- Recent expenses table with date filters:
  - All Time
  - Today
  - This Week
  - This Month
  - This Year
- Spending report grouped by expense category with amount and percentage.
- Simple signup/login flow using the backend user routes.
- Account popover showing the logged-in user's name and email.
- Dark financial dashboard UI styled with regular CSS.
- CORS support for local development and configured frontend origins.

## Tech Stack

Frontend:

- React 19
- Vite
- Regular CSS
- Browser `fetch`
- LocalStorage for simple logged-in user persistence

Backend:

- Node.js
- Express 5
- MongoDB Atlas
- Mongoose
- dotenv

## Project Structure

```txt
Expense Tracker/

  client/
    public/
    src/
      components/
        auth/
          AuthModal.jsx
        commons/
          appConfig.jsx
          icons.jsx
          StatusMessage.jsx
        dashboard/
          RecentExpenses.jsx
          SpendingReport.jsx
          SummaryCard.jsx
          SummaryGrid.jsx
        layout/
          dashboard.jsx
          expenseTracker.jsx
          expenseTracker.css
          navbar.jsx
        transactions/
          TransactionModal.jsx
      hooks/
        useAuth.js
        useExpenseDashboardFilters.js
        useTransactions.js
      services/
        transactionsApi.js
        usersApi.js
      utils/
        dateRanges.js
        formatters.js
        transactionSummary.js
      App.jsx
      main.jsx
    vite.config.js

  server/
    aggregtor/
      expenseAggregtor.js
    config/
      db.js
    controllers/
      transaction.controller.js
      user.controller.js
    middlewares/
      errorHandler.js
    models/
      Transaction.js
      User.js
    routes/
      transaction.route.js
      user.routes.js
    services/
      dateRange.service.js
      transaction.services.js
      user.services.js
    app.js
    server.js
```

## Frontend Overview

The React app is organized around small, focused components:

- `ExpenseTrackerLayout` owns high-level UI state such as auth modal state, account popover state, selected date filters, and transaction modal state.
- `Navbar` renders dashboard navigation, signup/login/account/logout controls, and opens transaction forms.
- `Dashboard` composes the summary cards, recent expenses panel, and spending report panel.
- `RecentExpenses` and `SpendingReport` receive data and filter controls as props.
- `TransactionModal` is shared for both income and expense creation. The transaction type is locked based on the sidebar button used.
- `AuthModal` is shared for signup and login.

Data access is kept outside UI components:

- `transactionsApi.js` calls the transaction endpoints.
- `usersApi.js` calls the user endpoints.
- `useTransactions.js` loads all transactions and performs create operations.
- `useExpenseDashboardFilters.js` fetches filtered expenses and the backend spending report.
- `useAuth.js` handles simple login/signup/logout state.

## Backend Overview

The backend exposes REST APIs through Express and persists data with Mongoose.

Request flow:

1. `server.js` loads environment variables, connects to MongoDB, mounts API routes, and starts the server.
2. `app.js` creates the Express app, configures JSON parsing, and applies CORS headers.
3. Route files map HTTP endpoints to controller functions.
4. Controllers extract request data and call service or aggregation modules.
5. Services interact with Mongoose models.

## Environment Variables

### Backend

Create `server/.env`:

```env
MONOGODB_URI=your_mongodb_connection_string
PORT=5000
CLIENT_ORIGIN=https://your-frontend-url-here
```

Note: the current code reads `MONOGODB_URI` with this exact spelling.

### Frontend

Create `client/.env`:

```env
VITE_API_URL=http://localhost:5000
```

For production, replace it with the deployed backend URL:

```env
VITE_API_URL=https://your-backend-api-url-here
```

## API Documentation

Base URL in development:

```txt
http://localhost:5000
```

### Transactions

#### Create Transaction

```http
POST /api/transactions
```

Body:

```json
{
  "title": "Groceries",
  "amount": 2500,
  "type": "expense",
  "category": "food",
  "date": "2026-05-29T11:00:00.000Z"
}
```

`type` must be either `income` or `expense`.

#### Get Transactions

```http
GET /api/transactions
```

Optional query params:

```txt
type=income|expense
range=allTime|today|thisWeek|thisMonth|thisYear
startDate=ISO_DATE
endDate=ISO_DATE
```

Examples:

```http
GET /api/transactions?type=expense&range=thisMonth
GET /api/transactions?type=income
```

#### Update Transaction

```http
PUT /api/transactions/:id
```

Body may contain:

```json
{
  "title": "Updated title",
  "amount": 3000,
  "type": "expense",
  "category": "shopping",
  "date": "2026-05-29T11:00:00.000Z"
}
```

#### Delete Transaction

```http
DELETE /api/transactions/:id
```

### Spending Report

#### Category Spending Report

```http
GET /api/transactions/reports/categories
```

Optional query params:

```txt
range=allTime|today|thisWeek|thisMonth|thisYear
startDate=ISO_DATE
endDate=ISO_DATE
category=food
```

Example:

```http
GET /api/transactions/reports/categories?range=thisMonth
```

Response:

```json
{
  "totalExpenseAmount": 12647,
  "categoryTotals": [
    {
      "category": "food",
      "amount": 5400,
      "percent": 42.7
    }
  ]
}
```

### Users

#### Register

```http
POST /api/users/register
```

Body:

```json
{
  "name": "Parnil",
  "email": "parnil@example.com",
  "password": "secret123"
}
```

#### Login

```http
POST /api/users/login
```

Body:

```json
{
  "email": "parnil@example.com",
  "password": "secret123"
}
```

Response:

```json
{
  "id": "user_id",
  "name": "Parnil",
  "email": "parnil@example.com"
}
```

## Data Models

### Transaction

```js
{
  title: String,
  amount: Number,
  type: "income" | "expense",
  category: String,
  date: Date
}
```

### User

```js
{
  name: String,
  email: String,
  password: String,
  createdAt: Date,
  updatedAt: Date
}
```

## Spending Report Aggregation

The spending report is generated in `server/aggregtor/expenseAggregtor.js`.

The pipeline works like this:

1. `$match`
   - Selects only `expense` transactions.
   - Applies optional `startDate` and `endDate`.
   - Applies optional `category`.

2. `$facet`
   - Runs two grouped calculations in one aggregation:
     - `categoryTotals`: groups expenses by category and sums each category amount.
     - `totalExpenses`: sums all matched expense amounts.

3. `$project`
   - Extracts `totalExpenseAmount`.
   - Keeps category totals.

4. Post-processing in JavaScript
   - Calculates each category percentage:

```txt
category amount / total expense amount * 100
```

This keeps the Spending Report consistent with the same date filters used by Recent Expenses.

## Local Development

Install dependencies:

```bash
cd server
npm install

cd ../client
npm install
```

Start backend:

```bash
cd server
node server.js
```

Start frontend:

```bash
cd client
npm run dev
```

Open:

```txt
http://localhost:5173
```

## Build and Verification

Frontend:

```bash
cd client
npm run lint
npm run build
```

Backend syntax checks:

```bash
cd server
node -c server.js
node -c app.js
node -c controllers/transaction.controller.js
node -c controllers/user.controller.js
node -c routes/transaction.route.js
node -c routes/user.routes.js
node -c services/transaction.services.js
node -c services/user.services.js
node -c services/dateRange.service.js
node -c aggregtor/expenseAggregtor.js
```

## Deployment Notes

Frontend deployment:

- Build command: `npm run build`
- Output folder: `client/dist`
- Required env var: `VITE_API_URL`

Backend deployment:

- Entry file: `server/server.js`
- Required env vars:
  - `MONOGODB_URI`
  - `PORT`
  - `CLIENT_ORIGIN`
- Ensure MongoDB Atlas allows connections from the backend host.
- Ensure `CLIENT_ORIGIN` matches the deployed frontend URL exactly.

## Future Improvements

- Hash passwords and add JWT or session authentication.
- Scope transactions per user.
- Add backend validation and better error messages.
- Add automated tests for services, controllers, and aggregation behavior.
- Add edit/delete transaction controls to the frontend.
- Add charts for spending trends.
- Add CSV export for reports.
