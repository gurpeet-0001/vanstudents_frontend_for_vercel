import React, { useState } from "react";
import { Outlet, Link } from "react-router-dom";

export default function AdminLayout() {
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('Authorization');
    window.location.href = '/login';
  };
  const links = [
    ["All Students", "/admin/students"],
    ["Add Student" , "/admin/addstudent"],
    ["Create Parent", "/admin/createuser"],
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      {/* Header */}
      <header>
        <div className="bg-gradient-to-r from-slate-700 via-slate-800 to-slate-900 text-white shadow-xl border-b border-amber-100/10">
          <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-6">

            <div className="flex items-center gap-4">
              <button
                className="md:hidden text-2xl"
                onClick={() => setOpen(!open)}
              >
                ☰
              </button>

              <h1 className="text-2xl md:text-3xl font-bold">Admin</h1>
            </div>

            <div className="hidden md:flex items-center gap-5">
              <button className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg">Logout</button>
            </div>
          </div>
        </div>
      </header>

      {/* Desktop Navbar */}
      <nav className="hidden md:block bg-white shadow">
        <div className="max-w-6xl mx-auto flex justify-center gap-8 py-4 font-semibold text-gray-700">
          {links.map(([name, path]) => (
            <Link
              key={name}
              to={path}
              className="hover:text-emerald-600 transition"
            >
              {name}
            </Link>
          ))}
        </div>
      </nav>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white shadow">
          {links.map(([name, path]) => (
            <Link
              key={name}
              to={path}
              onClick={() => setOpen(false)}
              className="block px-6 py-3 border-b hover:bg-gray-100"
            >
              {name}
            </Link>
          ))}

          <button onClick={handleLogout} className="w-full text-left px-6 py-3 text-red-600 font-semibold">
            Logout
          </button>
        </div>
      )}

      {/* Content */}

      <Outlet />
    </div>
  )}
