import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import "./CSS/Calendar.css"
import { useDispatch, useSelector } from 'react-redux';
import { GetTodosThunk } from '../Store/TodoSlice';
import { useEffect, useState } from 'react';
import InputForm from './UI/InputForm';

export default function CalendarPanel({ ExpenseMode }) {
  const dispatch = useDispatch();
  const { todos:tasks  } = useSelector(state => state.todo);
  const [showModal, setShowModal]= useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(()=>{        
    dispatch(GetTodosThunk());
  },[dispatch]);
  
  function handleDateClick(info) {
    // setSelectedDate(info.dateStr) // send date 
    console.log(info.dateStr)
    setSelectedDate(info.dateStr)
    setShowModal(true);
  }

  
  return (
    <div className="cal ">
      {showModal && <InputForm selectedDate={selectedDate} closeModal={()=> setShowModal(prev => !prev)}/>}
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView={ExpenseMode ? "dayGridWeek" : "dayGridMonth"}
        height="auto"
        dateClick={handleDateClick}
        events={tasks.map(task => ({
          title: task.title,
          date: task.date,
          color: task.isCompleted ? "#22c55e" : "#3ab3e2"
        }))}
      />
    </div>
  )
}

// export default function CalendarPanel() {
//   const dispatch = useDispatch();
//   const { todos:tasks  } = useSelector(state => state.todo);
//   const [showModal, setShowModal]= useState(false);
//   const [selectedDate, setSelectedDate] = useState(null);

//   useEffect(()=>{        
//     dispatch(GetTodosThunk());
//   },[dispatch]);
  
//   function handleDateClick(info) {
//     // setSelectedDate(info.dateStr) // send date 
//     console.log(info.dateStr)
//     setSelectedDate(info.dateStr)
//     setShowModal(true);
//   }

  
//   return (
//     <div className="cal ">
//       {showModal && <InputForm selectedDate={selectedDate} closeModal={()=> setShowModal(prev => !prev)}/>}
//       <FullCalendar
//         plugins={[dayGridPlugin, interactionPlugin]}
//         initialView="dayGridMonth"
//         height="auto"
//         dateClick={handleDateClick}
//         events={tasks.map(task => ({
//           title: task.title,
//           date: task.date,
//           color: task.isCompleted ? "#22c55e" : "#3ab3e2"
//         }))}
//       />
//     </div>
//   )
// }
