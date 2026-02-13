import React, { useState } from "react";
import "../Layout.css";
import ExpenseInput from "../Components/UI/ExpenseInput";
import InputForm from "../Components/UI/InputForm";
import StickyBtn from "../Components/UI/stickyBtn";
import RightHeader from "../Components/UI/RightHeader";
import TopHeader from "../Components/UI/TopHeader";
import { motion as Motion } from "framer-motion";

const PageLayout = ({ left, right, ExpenseMode }) => {

  const [showModal, setShowModal] = useState(false);
  
  const leftPanelVariants = {
    initial: { x: "-100%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "-100%", opacity: 0 },
  };

  const rightPanelVariants = {
    initial: { x: "100%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "100%", opacity: 0 },
  };

  return (
    <>
      {showModal &&
        (ExpenseMode ? (
          <ExpenseInput closeModal={() => setShowModal((prev) => !prev)} />
        ) : (
          <InputForm closeModal={() => setShowModal((prev) => !prev)} />
        ))}
      <StickyBtn onClick={() => setShowModal((prev) => !prev)} />
      {/* <TopHeader />    */}
      <div className="MainPage-Layout">
        {/* LEFT PANEL */}
        <Motion.div
          className="cal-wrapper"
          variants={leftPanelVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          {left}
        </Motion.div>

        {/* RIGHT PANEL */}
        <Motion.div
          className="right-wrapper"
          variants={rightPanelVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
            <RightHeader/>
          {right}
        </Motion.div>
      </div>
    </>
  );
};

export default PageLayout;

// <div className="MainPage-Layout">
// <div className="cal-wrapper">
//     {left}
// </div>
// <div className="right-wrapper">
//     <RightHeader/>
//     {right}
// </div>
// </div>
