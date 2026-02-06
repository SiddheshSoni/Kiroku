import React, { useState } from 'react'
import CalendarPanel from './Components/Calendar'
import "./Layout.css";
import Todos from './Components/Todos';
import RightHeader from './Components/RightHeader';
import InputForm from './Components/UI/InputForm';
import StkyBtn from './Components/UI/stickyBtn'; 

const Layout = () => {
  const [showModal, setShowModal]= useState(false);
  return (
    <>  
      <StkyBtn onClick={()=>setShowModal(prev => !prev)} /> 
      {showModal && <InputForm closeModal={()=> setShowModal(prev => !prev)}/>}
      <div className='MainPage-Layout'>
        <div className='cal-wrapper'>
          <CalendarPanel />
        </div>
        <div className='todo-wrapper'>
          <RightHeader/>
          <Todos />
        </div>
      </div>
    </>
  )
}

export default Layout