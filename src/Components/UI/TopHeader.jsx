import React, { useEffect } from 'react';
import "./CSS/TopHeader.css";
import { Button }from 'react-bootstrap';
import Switch from './Switch';
import { useDispatch, useSelector,  } from 'react-redux';
import { UIActions } from '../../Store/UISlice';
import { useNavigate } from "react-router";
import useMediaQuery from "@mui/material/useMediaQuery"; // optional but clean
import { AuthActions } from '../../Store/AuthSlice';
import logo from '../../assets/Kiroku.png'

const TopHeader = ({ animateMascot }) => {
    const dispatch = useDispatch();
    const { theme } = useSelector(state => state.ui);
    const navigate = useNavigate();
    const isMobile = useMediaQuery("(max-width:768px)");
    // console.log("isMobile:", isMobile);

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleThemeHandler = () =>{
        dispatch( UIActions.toggleTheme());
    };
    
    const logoutHandler = () =>{
        dispatch(AuthActions.logout());
        localStorage.removeItem('user');
        localStorage.removeItem('idToken');
        navigate('/Welcome');
    };
  return (
    <div className='top-header'>
        <div className="app-title" onClick={animateMascot} >
            <img id='logo' src={logo} />
            KIROKU.
        </div>
        <div className="mode-toggler">
            <Switch />
        </div>
        <div className="logout-b">
            {!isMobile && 
                <div className='theme-toggle' onClick={toggleThemeHandler} >
                    <div className={`pill ${theme==='dark' ? "left" : "right"}`}/>
                    <button className={theme ==='dark'? "active" : "" } >
                        <i className="fa-solid fa-moon"></i>
                    </button>
                    <button className={theme ==='light' ? "active" : "" }>
                        <i className="fa-solid fa-sun"></i>
                    </button>                
                </div>
            }
            { isMobile && 
                <div className='theme-toggle' onClick={toggleThemeHandler} >
                    {theme === 'dark' ?
                    (<button className={theme ==='dark'? "active" : "" } >
                        <i className="fa-solid fa-moon"></i>
                    </button>):(
                        <button className={theme ==='light' ? "active" : "" }>
                        <i className="fa-solid fa-sun"></i>
                    </button> 
                    )
                    }
        
                    
                                   
                </div>
                
            }
            <Button className='logout-btn' variant='primary' onClick={logoutHandler}>
                Logout
            </Button>
        </div>
    </div>
  )
}

export default TopHeader