import React from 'react'
import { Navigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'


const RoleRedirect = () => {
    const token = localStorage.getItem("Authorization");

    if(!token){
        return <Navigate to='/login'/>
    }

    try {
        const decoded = jwtDecode(token);
        if(decoded.role === "admin"){
            return <Navigate to={'/admin/students'} replace/>
        }
        return <Navigate to={'/students'} replace/>
        
    } catch (error) {
        localStorage.removeItem("Authorization");
        return <Navigate to={'/login'} replace/>
    }

}

export default RoleRedirect