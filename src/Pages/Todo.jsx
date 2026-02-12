import React, { useEffect } from "react";
import CalendarPanel from "../Components/Calendar";
import "../Layout.css";
import Todos from "../Components/Todos";
import { useDispatch, useSelector } from "react-redux";
import useTodo from "../Hooks/useTodo";
import { GetTodosThunk } from "../Store/TodoSlice";
import PageLayout from "./PageLayout";
import { motion as Motion } from "framer-motion";

const Todo = () => {
  const dispatch = useDispatch();
  const { todos: tasks } = useSelector((state) => state.todo);
  const { dailyTasks, regularTasks } = useTodo(tasks || []); //defining a custom hook to get all the necessary data and filtering it

  useEffect(() => {
    dispatch(GetTodosThunk());
  }, [dispatch]);
  // const slideVariants = {
  //   initial: { x: "100%", opacity: 0 },
  //   animate: { x: 0, opacity: 1 },
  //   exit: { x: "-100%", opacity: 0 },
  // };
  return (
    <>
      <PageLayout
        ExpenseMode={true}
        left={<CalendarPanel ExpenseMode={false} />}
        right={
          <>
            <Todos dailyTasks={dailyTasks} regularTasks={regularTasks} />
          </>
        }
      />
    </>
  );
};

export default Todo;

{
  /* <div className='MainPage-Layout'>
  <div className='cal-wrapper'>
    <CalendarPanel mode={false}/>
  </div>
  <div className='right-wrapper'>
    <RightHeader/>
    <Todos 
      dailyTasks = {dailyTasks}
      regularTasks = {regularTasks}
    /> 
  </div>
</div> */
}
