import React from 'react';
import "./CSS/ExpensesList.css";


const ExpensesList = ({expense, total, selectedMonth}) => {
    const months = ["Jan", "Feb" , "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const idx = Number(selectedMonth.slice(5, 7)) - 1;
  return (
    <>
        <div className='expense-list-card'>
            <div className='expense-list-title-bar'>
                <h3>Expenses</h3>
                <h5>{months[idx]} {selectedMonth.slice(0, 4)}</h5>
            </div>
                { expense && expense.map(exp =>(
                    <div className='expense-item' key={exp.id}>
                        <div className='left'>🍔{exp.title} - {exp.amount}</div>
                        <div>{exp.category}</div>
                        <div className="right">
                            {exp.date}
                        </div>
                    </div>
                ))}
                <div className='expense-total'>Total: <span className=' fw-bold'>  ₹{total}</span></div>
        </div>
    </>
  )
}

export default ExpensesList