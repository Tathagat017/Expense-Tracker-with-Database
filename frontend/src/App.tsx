import React, { useState, useEffect } from "react";
import { Container, Title, Text, Alert, Grid, Stack } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconAlertCircle } from "@tabler/icons-react";
import { ExpenseForm } from "./components/ExpenseForm";
import { ExpenseList } from "./components/ExpenseList";
import { ExpenseFilter } from "./components/ExpenseFilter";
import { ExpenseSummary } from "./components/ExpenseSummary";
import { expenseApi } from "./services/api";
import { Expense, ExpenseCreate, TotalsResponse } from "./types/expense";

function App() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [filteredExpenses, setFilteredExpenses] = useState<Expense[]>([]);
  const [totals, setTotals] = useState<TotalsResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch all expenses
  const fetchExpenses = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await expenseApi.getAllExpenses();
      setExpenses(data);
      setFilteredExpenses(data);
    } catch (err) {
      const errorMessage = "Failed to fetch expenses";
      setError(errorMessage);
      notifications.show({
        title: "Error",
        message: errorMessage,
        color: "red",
        icon: <IconAlertCircle size={16} />,
      });
      console.error("Error fetching expenses:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch totals
  const fetchTotals = async () => {
    try {
      const data = await expenseApi.getTotals();
      setTotals(data);
    } catch (err) {
      console.error("Error fetching totals:", err);
    }
  };

  // Create new expense
  const handleCreateExpense = async (expenseData: ExpenseCreate) => {
    try {
      setIsLoading(true);
      setError(null);
      await expenseApi.createExpense(expenseData);
      await fetchExpenses();
      await fetchTotals();
    } catch (err) {
      const errorMessage = "Failed to create expense";
      setError(errorMessage);
      notifications.show({
        title: "Error",
        message: errorMessage,
        color: "red",
        icon: <IconAlertCircle size={16} />,
      });
      console.error("Error creating expense:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Delete expense
  const handleDeleteExpense = async (id: number) => {
    try {
      setIsLoading(true);
      setError(null);
      await expenseApi.deleteExpense(id);
      await fetchExpenses();
      await fetchTotals();
      notifications.show({
        title: "Success",
        message: "Expense deleted successfully",
        color: "green",
      });
    } catch (err) {
      const errorMessage = "Failed to delete expense";
      setError(errorMessage);
      notifications.show({
        title: "Error",
        message: errorMessage,
        color: "red",
        icon: <IconAlertCircle size={16} />,
      });
      console.error("Error deleting expense:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Filter by category
  const handleCategoryFilter = async (category: string) => {
    try {
      setIsLoading(true);
      const data = await expenseApi.getExpensesByCategory(category);
      setFilteredExpenses(data);
    } catch (err) {
      const errorMessage = "Failed to filter expenses";
      setError(errorMessage);
      notifications.show({
        title: "Error",
        message: errorMessage,
        color: "red",
        icon: <IconAlertCircle size={16} />,
      });
      console.error("Error filtering expenses:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Filter by date range
  const handleDateRangeFilter = async (startDate: string, endDate: string) => {
    try {
      setIsLoading(true);
      const data = await expenseApi.filterByDateRange(startDate, endDate);
      setFilteredExpenses(data);
    } catch (err) {
      const errorMessage = "Failed to filter expenses by date range";
      setError(errorMessage);
      notifications.show({
        title: "Error",
        message: errorMessage,
        color: "red",
        icon: <IconAlertCircle size={16} />,
      });
      console.error("Error filtering expenses by date range:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Clear filters
  const handleClearFilters = () => {
    setFilteredExpenses(expenses);
  };

  // Initial data fetch
  useEffect(() => {
    fetchExpenses();
    fetchTotals();
  }, []);

  return (
    <Container size="xl" py="xl">
      <Stack mb="xl">
        <Title order={1} size="h1">
          Expense Tracker
        </Title>
        <Text c="dimmed">Track and manage your expenses efficiently</Text>
      </Stack>

      {error && (
        <Alert
          icon={<IconAlertCircle size={16} />}
          title="Error"
          color="red"
          mb="md"
          onClose={() => setError(null)}
          withCloseButton
        >
          {error}
        </Alert>
      )}

      <Grid>
        <Grid.Col span={{ base: 12, lg: 4 }}>
          <Stack>
            <ExpenseForm onSubmit={handleCreateExpense} isLoading={isLoading} />
            <ExpenseSummary totals={totals} isLoading={isLoading} />
          </Stack>
        </Grid.Col>

        <Grid.Col span={{ base: 12, lg: 8 }}>
          <Stack>
            <ExpenseFilter
              onCategoryFilter={handleCategoryFilter}
              onDateRangeFilter={handleDateRangeFilter}
              onClearFilters={handleClearFilters}
            />
            <ExpenseList
              expenses={filteredExpenses}
              onDelete={handleDeleteExpense}
              isLoading={isLoading}
            />
          </Stack>
        </Grid.Col>
      </Grid>
    </Container>
  );
}

export default App;
