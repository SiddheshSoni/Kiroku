import React, { useEffect, useState } from 'react'
import "./CSS/RightHeader.css"
import { GetStreak, getUsername } from '../../API/streak-userDB';

const RightHeader = () => {
  const [streak, setStreak] = useState(0);
  const [username, setUsername ] = useState('user');

  useEffect(()=>{
    const fetchStreak=async ()=>{
      const res = await GetStreak();
      setStreak(res.data);
    }
    const fetchUsername = async ()=>{
      const res = await getUsername();
      if(res.ok){
        localStorage.setItem('displayname', res.data);
        setUsername(res.data);
      }
    }
    fetchUsername();
    fetchStreak();
  },[]);

  return (
    <div className='Rheader'>
        <div className='greetings'>
            Hello {username}! 👋
        </div>
        
        <div className='streak'>
            <span className=' fw-medium'>Streak</span> : {streak}🔥 
        </div>
        
    </div>
  )
}

export default RightHeader