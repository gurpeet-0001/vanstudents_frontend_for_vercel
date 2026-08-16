import React, { useEffect, useState } from "react";
import api from "../middleware/axios.jsx"
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'

export const Login = () => {
  const [phoneNumber, setphoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const response = await api.post('/auth/login', { parentNumber: phoneNumber, password: password });
      localStorage.setItem('Authorization', response.data.token);

      //now see if the user is admin or not
      const decoded = jwtDecode(response.data.token)
      if (decoded.role === 'user') {
        navigate('/students');
      }
      else {
        navigate('/admin/students');
      }
      return
    } catch (error) {
      return console.log('error : ' + error);
    }


  }
  return (
    <div className="min-h-screen flex flex-col gap-10 items-center justify-center bg-gray-100">

      <p className="text-center italic text-red-500 underline">This site was made mainly to show how Rolebased authentication is done using Tokens -JWT</p>
      <div className="w-full max-w-sm bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6">Login</h1>

        <form className="flex flex-col gap-4 " onSubmit={handleLogin}>
          <div>
            <label className="block mb-2 font-medium">
              Phone Number
            </label>
            <input
              type="number"
              placeholder="Enter your phone number"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => (setphoneNumber(e.target.value))}
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => (setPassword(e.target.value))}
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Login
          </button>
        </form>
      </div>
      <div className="text-center italic text-red-500 underline">
        <p>Use phoneNo. 1234567890 & pass. admin@12 for Admin login</p>
        <p>OR</p>
        <p>Use phoneNo. 1122334455 & pass. 1122334455 for User login.</p>
        <p> You can create your own user in admin panel too</p>
      </div>

    </div>
  );
};