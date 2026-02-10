import React from 'react';
import "./CSS/TopHeader.css";
import { Button }from 'react-bootstrap';
import Switch from './Switch';
const TopHeader = () => {
  return (
    <div className='top-header'>
        <div className="app-title">
            App Name
        </div>
        <div className="mode-toggler">
            <Switch />
        </div>
        <div className="logout-b">
            <Button variant='primary'>
                Logout
            </Button>
        </div>
    </div>
  )
}

export default TopHeader