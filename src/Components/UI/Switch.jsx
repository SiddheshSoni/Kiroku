import React from 'react'
import { Button } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router'
import "./CSS/Switch.css";
import useMediaQuery from "@mui/material/useMediaQuery";
const Switch = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const location = useLocation();
    const isMobile = useMediaQuery("(max-width:768px)");

    const isExpense = pathname.startsWith('/Expense');

  return (
      <div className='toggle-switch'>
       { isMobile ? (
        <>
          {location.pathname === "/expense" ? (
              <button onClick={() => navigate("/todo")}>
              Todo
              </button>
          ) : (
              <button onClick={() => navigate("/expense")}>
              Expense
              </button>
          )}
        </>
       ):(
        <>
          <div
          className={`pill ${isExpense ? "left" : "right"}`}
          />
          <button className={isExpense ? "active" : "" } onClick={()=> navigate('/Expense')}>
            Expense
          </button>
          <button className={isExpense ? "" : "active" } onClick={()=> navigate('/Todo')}>
            Todo
          </button>
        </>
      )}
    </div>
  )

}

export default Switch;