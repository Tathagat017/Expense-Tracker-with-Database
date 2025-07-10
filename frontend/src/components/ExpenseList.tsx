import React from "react";
import {
  Paper,
  Title,
  Table,
  ActionIcon,
  Badge,
  Text,
  Group,
} from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { Expense } from "../types/expense";

interface ExpenseListProps {
  expenses: Expense[];
  onDelete: (id: number) => void;
  isLoading?: boolean;
}

export const ExpenseList: React.FC<ExpenseListProps> = ({
  expenses,
  onDelete,
  isLoading = false,
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  if (expenses.length === 0) {
    return (
      <Paper shadow="sm" p="lg">
        <Text c="dimmed" ta="center">
          No expenses found.
        </Text>
      </Paper>
    );
  }

  const rows = expenses.map((expense) => (
    <Table.Tr key={expense.id}>
      <Table.Td>{formatDate(expense.date)}</Table.Td>
      <Table.Td>{expense.description || "-"}</Table.Td>
      <Table.Td>
        <Badge color="blue" variant="light">
          {expense.category}
        </Badge>
      </Table.Td>
      <Table.Td>
        <Text fw={500}>{formatCurrency(expense.amount)}</Text>
      </Table.Td>
      <Table.Td>
        <ActionIcon
          color="red"
          variant="subtle"
          onClick={() => onDelete(expense.id)}
          disabled={isLoading}
          title="Delete expense"
        >
          <IconTrash size={18} />
        </ActionIcon>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Paper shadow="sm" withBorder>
      <Group p="lg" style={{ borderBottom: "1px solid #e9ecef" }}>
        <Title order={2}>Expenses</Title>
      </Group>
      <Table striped highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Date</Table.Th>
            <Table.Th>Description</Table.Th>
            <Table.Th>Category</Table.Th>
            <Table.Th>Amount</Table.Th>
            <Table.Th>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Paper>
  );
};
