import React from 'react';
import './App.css'
import Layout from './Layout';
import { Navigate, Route, Routes, } from 'react-router';
import Todo from './Pages/Todo';
import Expense from './Pages/Expense';

function App() {

  return (
      <Routes >
        <Route element={<Layout />}>
          <Route path="/Todo" element={<Todo />} />
          <Route path="/Expense" element={<Expense />} />
          <Route path="*" element={<Navigate to="/Todo" />} />
        </Route>
      </Routes>
  )
}

export default App;
