import React, { useEffect } from 'react';
import "./CSS/TopHeader.css";
import { Button }from 'react-bootstrap';
import Switch from './Switch';
import { useDispatch, useSelector } from 'react-redux';
import { UIActions } from '../../Store/UISlice';
import { useNavigate } from 'react-router';

const TopHeader = () => {
    const dispatch = useDispatch();
    const { theme } = useSelector(state => state.ui);
    const navigate = useNavigate();

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleThemeHandler = () =>{
        dispatch( UIActions.toggleTheme());
    };
    
    const logoutHandler = () =>{
        localStorage.removeItem('user');
        localStorage.removeItem('idToken');
        navigate('/Welcome');
    };
  return (
    <div className='top-header'>
        <div className="app-title">
            <img id='logo' src='/Kiroku.png' />
            KIROKU.
        </div>
        <div className="mode-toggler">
            <Switch />
        </div>
        <div className="logout-b">
            <div className=' theme-toggle' onClick={toggleThemeHandler} >
                <div
                    className={`pill ${theme==='dark' ? "left" : "right"}`}
                />

                <button className={theme ==='dark'? "active" : "" } >
                    <i className="fa-solid fa-moon"></i>
                </button>
                <button className={theme ==='light' ? "active" : "" }>
                    <i className="fa-solid fa-sun"></i>
                </button>                
            </div>
            <Button variant='primary' onClick={logoutHandler}>
                Logout
            </Button>
        </div>
    </div>
  )
}

export default TopHeader