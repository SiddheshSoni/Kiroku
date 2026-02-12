import React, { useEffect, useState } from "react";
import CalendarPanel from "../Components/Calendar";
import "../Layout.css";
import ExpensesList from "../Components/ExpensesList";
import ExpenseGraph from "../Components/ExpenseGraph";
import { useDispatch, useSelector } from "react-redux";
import { getExpenseThunk } from "../Store/expenseSlice";
import useExpense from "../Hooks/useExpense";
import PageLayout from "./PageLayout";
import { motion as Motion } from "framer-motion";

const Expense = () => {
  const [selectedMonth, setSelectedMonth] = useState(
    new Date().toLocaleDateString("en-CA").slice(0, 7),
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getExpenseThunk());
  }, [dispatch]);

  const { expenses } = useSelector((state) => state.expense);
  const { categorizedExpense, monthlyExpense, monthlyTotal } = useExpense(
    expenses,
    selectedMonth,
  );

  return (
    <>
      <PageLayout
        ExpenseMode={true}
        left={
          <>
            <CalendarPanel ExpenseMode={true} items={expenses} />
            <ExpenseGraph
              expense={categorizedExpense}
              total={monthlyTotal}
              selectedMonth={selectedMonth}
              setSelectedMonth={setSelectedMonth}
            />
          </>
        }
        right={
          <>
            {/* <RightHeader/> */}
            <ExpensesList
              expense={monthlyExpense}
              total={monthlyTotal}
              selectedMonth={selectedMonth}
            />
          </>
        }
      />
    </>
  );
};

export default Expense;
{
  /* <div className='MainPage-Layout'>
  <div className='cal-wrapper'>
    <CalendarPanel mode={true}/>
    <ExpenseGraph
      expense = {categorizedExpense}
      total = {monthlyTotal}
      selectedMonth = {selectedMonth}
      setSelectedMonth = {setSelectedMonth}
    />
  </div>
  <div className='right-wrapper'>
    <RightHeader/>
    <ExpensesList 
      expense = {monthlyExpense}
      total = {monthlyTotal}
      selectedMonth={selectedMonth}
    />  
  </div>
</div> */
}
