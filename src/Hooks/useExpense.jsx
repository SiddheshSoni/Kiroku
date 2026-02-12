import React, { useMemo } from "react";

const useExpense = (expenses, selectedMonth) => {
  const month =
    selectedMonth ?? new Date().toLocaleDateString("en-CA").slice(0, 7);

  const monthlyExpense = useMemo(() => {
    if (!expenses || expenses.length === 0) {
      return [];
    }
    return expenses.filter((ex) => ex.date.slice(0, 7) === month);
  }, [expenses, month]);

  const monthlyTotal = useMemo(() => {
    return monthlyExpense.reduce(
      (sum, expense) => sum + Number(expense.amount),
      0,
    );
  }, [monthlyExpense]);

  const categorizedExpense = useMemo(() => {
    if (!monthlyExpense || monthlyExpense.length === 0) return [];

    const categoryMap = monthlyExpense.reduce((acc, expense) => {
      const key = expense.category.label; // 🔥 use label as key
      const amount = Number(expense.amount);

      if (!acc[key]) {
        acc[key] = {
          id: key,
          category: expense.category, // 🔥 keep full object
          total: 0,
        };
      }

      acc[key].total += amount;

      return acc;
    }, {});

    return Object.values(categoryMap);
  }, [monthlyExpense]);

  return { categorizedExpense, monthlyExpense, monthlyTotal };
};

export default useExpense;
