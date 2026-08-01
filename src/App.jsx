import React from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import { Login } from "./pages/Login"
import { Authlayout } from "./layout/Authlayout"
import Mainlayout from "./layout/Mainlayout"
import Protectedroute from "./layout/Protectedroute"

//user routes
import Students from "./userComponents/Students"
import Fees from "./userComponents/Fees"

//admin routes
import Adminlayout from "./layout/Adminlayout"
import AllStudents  from "./adminComponets/allstudents.jsx"
import CreateUser  from "./adminComponets/createUser.jsx"
import EditStudents from "./adminComponets/EditStudents.jsx"
import AddStudent from "./adminComponets/addstudent.jsx"

export const App = () => {

  return (
    <>
      <Routes>

        <Route path="/" element={<Navigate to="/students" replace />} />
        
        <Route element={<Authlayout />}>
          <Route path="/login" element={<Login />}></Route>
        </Route>

        <Route element={<Protectedroute />}>
          <Route element={<Mainlayout />}>
            <Route path="/students" element={<Students />}></Route>
            <Route path="/fees/:id" element={<Fees/>}></Route>
          </Route>
          
          <Route path="/admin" element={<Adminlayout />}>
            <Route path="/admin/students" element={<AllStudents />}></Route>
            <Route path="/admin/students/:id" element={<EditStudents />}></Route>
            <Route path="/admin/createuser" element={<CreateUser />}></Route>
            <Route path="/admin/addstudent" element={<AddStudent/>}></Route>
          </Route>
        </Route>

      </Routes>
    </>
  )
}

