import React from "react";
import { useForm } from "@mantine/form";
import {
  Button,
  Select,
  TextInput,
  NumberInput,
  Paper,
  Title,
  Stack,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { CategoryEnum, ExpenseCreate } from "../types/expense";

interface ExpenseFormProps {
  onSubmit: (data: ExpenseCreate) => void;
  isLoading?: boolean;
}

export const ExpenseForm: React.FC<ExpenseFormProps> = ({
  onSubmit,
  isLoading = false,
}) => {
  const form = useForm<ExpenseCreate>({
    initialValues: {
      amount: 0,
      description: "",
      category: CategoryEnum.OTHER,
    },
    validate: {
      amount: (value) => (value <= 0 ? "Amount must be positive" : null),
      category: (value) => (!value ? "Category is required" : null),
    },
  });

  const handleSubmit = (values: ExpenseCreate) => {
    onSubmit(values);
    form.reset();
    notifications.show({
      title: "Success",
      message: "Expense added successfully!",
      color: "green",
    });
  };

  const categoryOptions = Object.values(CategoryEnum).map((category) => ({
    value: category,
    label: category,
  }));

  return (
    <Paper shadow="sm" p="lg" mb="md">
      <Title order={2} mb="md">
        Add New Expense
      </Title>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <NumberInput
            label="Amount ($)"
            placeholder="0.00"
            min={0.01}
            step={0.01}
            decimalScale={2}
            fixedDecimalScale
            required
            {...form.getInputProps("amount")}
          />

          <Select
            label="Category"
            placeholder="Select a category"
            data={categoryOptions}
            required
            {...form.getInputProps("category")}
          />

          <TextInput
            label="Description (Optional)"
            placeholder="Enter description..."
            {...form.getInputProps("description")}
          />

          <Button type="submit" loading={isLoading} fullWidth>
            Add Expense
          </Button>
        </Stack>
      </form>
    </Paper>
  );
};
