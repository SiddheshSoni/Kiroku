import React from 'react';
import "./CSS/stickyBtn.css";

const StickyBtn = ({onClick}) => {
  return (
    <i id='sticky-btn' className="fa-solid fa-square-plus " onClick={onClick}> </i>
  )
}

export default StickyBtn;