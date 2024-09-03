import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Route, Routes } from 'react-router-dom';
import AddDashboard from './components/AddDashboard';
import Form from './components/Form';
import Update from './components/Update';
import Student from './views/Student';
import StudentForm from './views/StudentForm';
import StudentDash from './views/SrudentDash';
function App() {
  return (
    <Routes>
      <Route path='/' element={<AddDashboard />} />
      <Route path='form' element={<Form />}/>
      <Route path='update' element={<Update />}/>
      <Route path='student' element={<Student />}/>
      <Route path='studentform' element={<StudentForm />}/>
      <Route path='studentDash' element={<StudentDash />}/>
    </Routes>
  )
}

export default App

