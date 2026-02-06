import React from 'react'
import "./CSS/TodoCard.css";

const TodoCard = ({item , onDelete, onComplete }) => {
  const {  title, time, isCompleted } = item;

  const now = new Date().toTimeString().slice(0,5);
  const isDue = time < now && !isCompleted;
  
  const status =  isCompleted ? "Completed" : (isDue? "Overdue" : `Due at ${time}`);


  return (
    <div className='todo-card'>
      <div className='left'>
        <div className='complete-btn'>
          <span onClick={onComplete}>
            {isCompleted ? <i className="fa-solid fa-square-check"></i> : <i className="fa-regular fa-square"></i>}
          </span>
        </div>
        <div className='content'>
          <div className='card-title'>
          {title}
          </div>
          <div className={'status-text' + (isDue ? 'due':'')} >
          {status} 
          </div>
        </div>
      </div>
      <div className='right'>
        <div>
        <i onClick={onDelete} className="fa-solid fa-xmark delete-btn"></i>
        </div>
        <div>
        {time}
        </div>
      </div>
    </div>
  )
}

export default TodoCard;