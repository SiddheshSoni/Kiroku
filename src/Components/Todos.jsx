    import React from 'react'
    import TodoCard from './UI/TodoCard'
    import { useDispatch } from 'react-redux'
    import { DeleteTodosThunk, GetTodosThunk, UpdateTodosThunk } from '../Store/TodoSlice';
    import "./CSS/Todos.css";

    const Todos = ({ dailyTasks, regularTasks}) => {
        const dispatch = useDispatch();

        const onComplete = async(todo) =>{
            await dispatch(UpdateTodosThunk(todo));
        };
        const onDelete = async (id) =>{
            await dispatch(DeleteTodosThunk(id));
        };
        const fillerDai = { title: 'Add a Daily Task' , time:'00-00' , isCompleted: true};
        const fillerReg = {  title:'Any Tasks today?' , time:'00-00' , isCompleted: true};
    return (
        <div className='todos w-100 d-flex flex-column '>
            {dailyTasks && <h3>Daily Tasks</h3>}
            <div className="todo-list">
                {dailyTasks.length === 0 && <TodoCard item={fillerDai} />}
                {dailyTasks && dailyTasks.map( item => (
                    <TodoCard key={item.id} item={item} onComplete={()=>onComplete(item)} onDelete={()=>onDelete(item.id)} />
                ))}
            </div>
            {regularTasks && <h3>Regular</h3>}
            
            <div className="todo-list">
                {regularTasks.length === 0 && <TodoCard item={fillerReg}/>}
                {regularTasks && regularTasks.map( item => (
                    <TodoCard key={item.id} item={item} onComplete={()=>onComplete(item)} onDelete={()=>onDelete(item.id)} />
                ))}
            </div>
        </div>
    )
    }

    export default Todos