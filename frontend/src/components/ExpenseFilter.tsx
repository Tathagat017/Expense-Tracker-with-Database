import React, { useState } from "react";
import {
  Paper,
  Title,
  Select,
  Button,
  Group,
  Grid,
  Stack,
  TextInput,
} from "@mantine/core";
import { CategoryEnum } from "../types/expense";

interface ExpenseFilterProps {
  onCategoryFilter: (category: string) => void;
  onDateRangeFilter: (startDate: string, endDate: string) => void;
  onClearFilters: () => void;
}

export const ExpenseFilter: React.FC<ExpenseFilterProps> = ({
  onCategoryFilter,
  onDateRangeFilter,
  onClearFilters,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const handleCategoryChange = (category: string | null) => {
    const categoryValue = category || "";
    setSelectedCategory(categoryValue);
    if (categoryValue) {
      onCategoryFilter(categoryValue);
    } else {
      onClearFilters();
    }
  };

  const handleDateRangeFilter = () => {
    if (startDate && endDate) {
      onDateRangeFilter(startDate, endDate);
    }
  };

  const handleClearFilters = () => {
    setSelectedCategory("");
    setStartDate("");
    setEndDate("");
    onClearFilters();
  };

  const categoryOptions = [
    { value: "", label: "All Categories" },
    ...Object.values(CategoryEnum).map((category) => ({
      value: category,
      label: category,
    })),
  ];

  return (
    <Paper shadow="sm" p="lg" mb="md">
      <Title order={2} mb="md">
        Filter Expenses
      </Title>

      <Stack>
        <Grid>
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Select
              label="Filter by Category"
              placeholder="Select category"
              data={categoryOptions}
              value={selectedCategory}
              onChange={handleCategoryChange}
              clearable
            />
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 4 }}>
            <TextInput
              type="date"
              label="Start Date"
              placeholder="Select start date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 4 }}>
            <TextInput
              type="date"
              label="End Date"
              placeholder="Select end date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </Grid.Col>
        </Grid>

        <Group mt="md">
          <Button
            onClick={handleDateRangeFilter}
            disabled={!startDate || !endDate}
            color="green"
          >
            Apply Date Filter
          </Button>
          <Button onClick={handleClearFilters} variant="outline" color="gray">
            Clear Filters
          </Button>
        </Group>
      </Stack>
    </Paper>
  );
};
