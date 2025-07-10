# Expense Tracker Frontend

A modern React 18 + TypeScript + Vite + Mantine UI frontend for the Expense Tracker application.

## Features

- ✅ Add new expenses with amount validation
- ✅ Display expenses in a responsive table with date formatting
- ✅ Filter expenses by category dropdown
- ✅ Filter expenses by date range
- ✅ Show total spending and category breakdown
- ✅ Delete functionality for each expense
- ✅ Beautiful modern UI with Mantine components
- ✅ Form validation and error handling
- ✅ Loading states and notifications
- ✅ Responsive design for mobile and desktop

## Tech Stack

- **React 18** - Modern React with hooks
- **TypeScript** - Type safety and better development experience
- **Vite** - Fast build tool and development server
- **Mantine UI** - Modern React components library
- **Axios** - HTTP client for API calls
- **React Hook Form** - Form handling and validation

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- The FastAPI backend running on `http://localhost:8000`

## Installation

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

## API Integration

The frontend connects to the FastAPI backend at `http://localhost:8000` and uses the following endpoints:

- `GET /expenses/` - Fetch all expenses
- `POST /expenses/` - Create new expense
- `PUT /expenses/{id}` - Update expense
- `DELETE /expenses/{id}` - Delete expense
- `GET /expenses/category/{category}` - Filter by category
- `GET /expenses/total` - Get totals and breakdown
- `GET /expenses/filter?start_date=&end_date=` - Filter by date range

## Project Structure

```
src/
├── components/          # React components
│   ├── ExpenseForm.tsx     # Form for adding expenses
│   ├── ExpenseList.tsx     # Table showing expenses
│   ├── ExpenseFilter.tsx   # Filter controls
│   └── ExpenseSummary.tsx  # Summary and breakdown
├── services/           # API services
│   └── api.ts             # Axios API client
├── types/              # TypeScript type definitions
│   └── expense.ts         # Expense related types
├── App.tsx             # Main application component
├── main.tsx            # Application entry point
└── index.css           # Global styles
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Features Details

### Expense Form

- Amount validation (must be positive)
- Category selection from predefined enum
- Optional description field
- Form validation with error messages

### Expense List

- Responsive table with sorting
- Date formatting
- Currency formatting
- Category badges
- Delete buttons with confirmation

### Filtering

- Filter by category dropdown
- Date range filtering
- Clear filters functionality

### Summary

- Total expenses display
- Category breakdown with percentages
- Visual progress indicators

### UI/UX

- Modern Mantine UI components
- Responsive grid layout
- Loading states
- Error handling with notifications
- Clean, professional design
