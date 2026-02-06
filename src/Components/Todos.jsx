    import React, { useEffect } from 'react'
    import TodoCard from './UI/TodoCard'
    import { useDispatch, useSelector } from 'react-redux';
    import { DeleteTodosThunk, GetTodosThunk, UpdateTodosThunk } from '../Store/TodoSlice';
    import useTodos from '../Hooks/useTodos';
    import "./CSS/Todos.css";

    const Todos = () => {
        const dispatch = useDispatch();
        const { todos:tasks  } = useSelector(state => state.todo);
        const { dailyTasks, regularTasks } = useTodos(tasks || []) ; //defining a custom hook to get all the necessary data and filtering it

        useEffect(()=>{        
            dispatch(GetTodosThunk());
        },[dispatch]);
        

        const onComplete = async(todo) =>{
            await dispatch(UpdateTodosThunk(todo));
        };
        const onDelete = async (id) =>{
            await dispatch(DeleteTodosThunk(id));
        };
    return (
        <div className='todos w-100 d-flex flex-column '>
            {dailyTasks && <h1>Daily Tasks</h1>}
            <div className="todo-list">
                {dailyTasks && dailyTasks.map( item => (
                    <TodoCard key={item.id} item={item} onComplete={()=>onComplete(item)} onDelete={()=>onDelete(item.id)} />
                ))}
            </div>
            {regularTasks && <h1>Regular</h1>}
            
            <div className="todo-list">
                {regularTasks && regularTasks.map( item => (
                    <TodoCard key={item.id} item={item} onComplete={()=>onComplete(item)} onDelete={()=>onDelete(item.id)} />
                ))}
            </div>
        </div>
    )
    }

    export default Todos