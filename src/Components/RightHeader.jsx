import React, { useEffect, useState } from 'react'
import "./CSS/RightHeader.css"
import { GetStreak } from '../API/streakDB';

const RightHeader = () => {
  const [streak, setStreak] = useState(0);
  useEffect(()=>{
    const fetchStreak=async ()=>{
      const res = await GetStreak();
      setStreak(res.data.currentStreak);
    }
    fetchStreak();
  },[]);
  return (
    <div className='Rheader'>
        <div className='greetings'>
            Hello Siddhesh! 👋
        </div>
        <div className='streak'>
            <span className=' fw-medium'>Streak</span> : {streak}🔥 
        </div>
        
    </div>
  )
}

export default RightHeader