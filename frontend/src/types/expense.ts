export enum CategoryEnum {
  FOOD = "Food",
  HOUSING = "Housing",
  UTILITIES = "Utilities",
  ENTERTAINMENT = "Entertainment",
  SHOPPING = "Shopping",
  HEALTHCARE = "Health Care",
  TRAVEL = "Travel",
  OTHER = "Other",
}

export interface Expense {
  id: number;
  amount: number;
  description?: string;
  category: CategoryEnum;
  date: string;
}

export interface ExpenseCreate {
  amount: number;
  description?: string;
  category: CategoryEnum;
}

export interface ExpenseUpdate {
  amount: number;
  description?: string;
  category: CategoryEnum;
}

export interface TotalsResponse {
  total: number;
  breakdown: Record<string, number>;
}
