import React, { useState } from 'react'
import { Outlet, useLocation } from 'react-router';
import "./Layout.css";
import { AnimatePresence } from 'framer-motion';
import TopHeader from './Components/UI/TopHeader';

const Layout = () => {
  const location = useLocation();
  const [animate, setAnimate] = useState(false);

  const animateMascotHandler =()=>{
    setAnimate(true);
  };
  return (
    <>
        <TopHeader animateMascot={animateMascotHandler} />
      <AnimatePresence mode='wait' >
      <Outlet key={location.pathname}/>
      </AnimatePresence>
      <img id='logobg' className={animate ? "animate-mascot" : ""} onAnimationEnd={()=> setAnimate(false)} src='/Kiroku.png' />
    </>
  )
}

export default Layout;