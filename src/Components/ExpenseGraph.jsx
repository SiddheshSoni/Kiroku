import React from 'react'
import "./CSS/ExpenseGraph.css"
import { PieChart } from '@mui/x-charts/PieChart';

const ExpenseGraph = ({ expense, total, selectedMonth, setSelectedMonth }) => {
  const months = ["Jan", "Feb" , "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const idx = Number(selectedMonth.slice(5, 7)) - 1;

  const prevMonth = () =>{
    const newDt = new Date(selectedMonth + "-01");
    newDt.setMonth( newDt.getMonth() - 1);
    setSelectedMonth(newDt.toLocaleDateString("en-CA").slice(0,7));
  };
  const nextMonth = () =>{
    console.log("a")
    const newDt = new Date(selectedMonth + "-01");
    newDt.setMonth( newDt.getMonth() + 1);
    setSelectedMonth(newDt.toLocaleDateString("en-CA").slice(0,7));
  };
  return (
    <div className='expense-graph-wrapper'>
        <div className='exp-title-bar'>
          <div className=''>Total spent in :  ₹{total} </div>
          <div className='title-bar-right'>
            <div>
              {months[idx]} {selectedMonth.slice(0, 4)}
            </div>
            <div>
            <button className='btn-arr' onClick={()=> prevMonth()} >{'<'}</button>
            <button className='btn-arr' onClick={()=> nextMonth()}>{'>'}</button>
            </div>
          </div>
        </div>
        <div className='expense-ui'>
            <div className="categorized-exp">
              {expense && expense.map(exp=>(
                <div className='exp-cat' key={exp.id}> <span>🔥{exp.category}</span> <span>₹{exp.total}</span> </div>
              ))}
            </div>
            <div className="piechart">
                <PieChart  
                  series={[
                    {
                      innerRadius:75,
                      outerRadius:125,
                      data:expense.map(item => ({
                        id: item.id,
                        value: item.total,
                        label: item.category,
                      })),
                    }
                  ]}
                  width={250}
                  height={250}
                />
            </div>
        </div>
        <div className='exp-title' >Total: <span className=' fw-bold'>  ₹{total}</span></div>
    </div>
  )
}

export default ExpenseGraph;