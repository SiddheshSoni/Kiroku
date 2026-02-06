import React from 'react'
import { Button } from 'react-bootstrap'
import "./CSS/stickyBtn.css";

const stkyBtn = ({onClick}) => {
  return (
    <i id='sticky-btn' className="fa-solid fa-square-plus " onClick={onClick}></i>
  )
}

export default stkyBtn;