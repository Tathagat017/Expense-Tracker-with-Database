import React from "react";
import { Paper, Title, Text, Grid, Stack, Loader, Center } from "@mantine/core";
import { TotalsResponse } from "../types/expense";

interface ExpenseSummaryProps {
  totals: TotalsResponse | null;
  isLoading?: boolean;
}

export const ExpenseSummary: React.FC<ExpenseSummaryProps> = ({
  totals,
  isLoading = false,
}) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  if (isLoading) {
    return (
      <Paper shadow="sm" p="lg" mb="md">
        <Center>
          <Loader size="md" />
        </Center>
      </Paper>
    );
  }

  if (!totals) {
    return (
      <Paper shadow="sm" p="lg" mb="md">
        <Text c="dimmed" ta="center">
          No expense data available.
        </Text>
      </Paper>
    );
  }

  return (
    <Paper shadow="sm" p="lg" mb="md">
      <Title order={2} mb="md">
        Expense Summary
      </Title>

      <Stack mb="lg">
        <Center>
          <Stack align="center" gap="xs">
            <Text size="sm" c="dimmed">
              Total Expenses
            </Text>
            <Text size="xl" fw={700} c="blue">
              {formatCurrency(totals.total)}
            </Text>
          </Stack>
        </Center>
      </Stack>

      <div>
        <Title order={3} size="md" mb="md">
          Breakdown by Category
        </Title>
        <Grid>
          {Object.entries(totals.breakdown).map(([category, amount]) => (
            <Grid.Col span={{ base: 12, sm: 6, lg: 12 }} key={category}>
              <Paper bg="gray.0" p="sm" radius="sm">
                <Text size="sm" fw={500} mb="xs">
                  {category}
                </Text>
                <Text size="lg" fw={600} mb="xs">
                  {formatCurrency(amount)}
                </Text>
                <Text size="xs" c="dimmed">
                  {((amount / totals.total) * 100).toFixed(1)}% of total
                </Text>
              </Paper>
            </Grid.Col>
          ))}
        </Grid>
      </div>
    </Paper>
  );
};
