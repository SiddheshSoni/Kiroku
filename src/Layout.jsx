import React from 'react'
import { Outlet, useLocation } from 'react-router';
import "./Layout.css";
import { AnimatePresence } from 'framer-motion';
import TopHeader from './Components/UI/TopHeader';

const Layout = () => {
  const location = useLocation();
  return (
    <>
      <AnimatePresence >
        <TopHeader />
      <Outlet key={location.pathname}/>
      </AnimatePresence>
    </>
  )
}

export default Layout;