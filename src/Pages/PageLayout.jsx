import React, { useState } from "react";
import "../Layout.css";
import ExpenseInput from "../Components/UI/ExpenseInput";
import InputForm from "../Components/UI/InputForm";
import StickyBtn from "../Components/UI/stickyBtn";
import RightHeader from "../Components/UI/RightHeader";
import TopHeader from "../Components/UI/TopHeader";

const PageLayout = ({ left, right, ExpenseMode }) => {
    const [showModal, setShowModal]= useState(false);

    return (
        <>
            {showModal && 
                (ExpenseMode ? <ExpenseInput closeModal={()=> setShowModal(prev => !prev)}/> : 
                <InputForm closeModal={()=> setShowModal(prev => !prev)}/> 
            )}
            <StickyBtn onClick={()=>setShowModal(prev => !prev)} />
            {/* <TopHeader />    */}
            <div className="MainPage-Layout">
            <div className="cal-wrapper">
                {left}
            </div>
            <div className="right-wrapper">
                <RightHeader/>
                {right}
            </div>
            </div>
        </>
  );
};

export default PageLayout;
