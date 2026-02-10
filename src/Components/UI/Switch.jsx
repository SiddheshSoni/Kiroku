import React from 'react'
import { Button } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router'
import "./CSS/Switch.css";

const Switch = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const isExpense = pathname.startsWith('/Expense');

  return (
    <div className='toggle-switch'>
       <div
        className={`pill ${isExpense ? "left" : "right"}`}
      />
      <button className={isExpense ? "active" : "" } onClick={()=> navigate('/Expense')}>
        Expense
      </button>
      <button className={isExpense ? "" : "active" } onClick={()=> navigate('/Todo')}>
        Todo
      </button>
    </div>
  )
}

export default Switch