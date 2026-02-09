import React, { useMemo } from 'react'

const useTodo = (todos) => {
    const today = new Date().toLocaleDateString("en-CA");
        
    const dailyTasks = useMemo(()=>{
        return todos.filter( todo => todo.isDaily === true).map(td => ({...td, isCompleted: td.lastCompletedDate === today ? true : false}));
    },[todos, today]);
    const regularTasks = useMemo(()=>{
        const filteredTasks = todos.filter( todo => todo.isDaily === false && todo.date === today );
        return filteredTasks;
    },[todos, today ]);
    
    return {dailyTasks, regularTasks };
}

export default useTodo;