import axios from "axios";
import {
  Expense,
  ExpenseCreate,
  ExpenseUpdate,
  TotalsResponse,
} from "../types/expense";

const API_BASE_URL = "http://localhost:8000";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const expenseApi = {
  // Get all expenses
  getAllExpenses: async (): Promise<Expense[]> => {
    const response = await api.get("/expenses/");
    return response.data;
  },

  // Create new expense
  createExpense: async (expense: ExpenseCreate): Promise<Expense> => {
    const response = await api.post("/expenses/", expense);
    return response.data;
  },

  // Update expense
  updateExpense: async (
    id: number,
    expense: ExpenseUpdate
  ): Promise<Expense> => {
    const response = await api.put(`/expenses/${id}`, expense);
    return response.data;
  },

  // Delete expense
  deleteExpense: async (id: number): Promise<void> => {
    await api.delete(`/expenses/${id}`);
  },

  // Get expenses by category
  getExpensesByCategory: async (category: string): Promise<Expense[]> => {
    const response = await api.get(`/expenses/category/${category}`);
    return response.data;
  },

  // Get totals and breakdown
  getTotals: async (): Promise<TotalsResponse> => {
    const response = await api.get("/expenses/total");
    return response.data;
  },

  // Filter by date range
  filterByDateRange: async (
    startDate: string,
    endDate: string
  ): Promise<Expense[]> => {
    const response = await api.get(
      `/expenses/filter?start_date=${startDate}&end_date=${endDate}`
    );
    return response.data;
  },
};
