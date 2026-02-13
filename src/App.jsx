import React from 'react';
import './App.css'
import Layout from './Layout';
import { Navigate, Route, Routes, } from 'react-router';
import Todo from './Pages/Todo';
import Expense from './Pages/Expense';
import Welcome from './Pages/Welcome';
import SetUser from './Pages/SetUser';
import { useSelector } from 'react-redux';

function App() {
  const { isLoggedIn } = useSelector(state => state.auth);

  return (
      <Routes >
        <Route path='/welcome' element={<Welcome />}/>
        {isLoggedIn && <Route path='user' element={<SetUser />} />}
        {isLoggedIn && <Route element={<Layout />}>
          <Route path="/Todo" element={<Todo />} />
          <Route path="/Expense" element={<Expense />} />
          <Route path="*" element={<Navigate to="/Todo" />} />
        </Route>}
        <Route path="*" element={<Navigate to="/Welcome" />} />
      </Routes>
  )
}

export default App;
