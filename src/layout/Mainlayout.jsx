import React, { useEffect, useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import api from "../middleware/axios";
import Students from "../userComponents/Students";

export default function MainLayout() {
  const [open, setOpen] = useState(false);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const location = useLocation();

  

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);
        const response = await api.get('/students');
        setStudents(response.data || []);
      } catch (err) {
        console.error(err);
        setError('Failed to load students.');
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const handlelogout = () => {
    localStorage.removeItem('Authorization');
    window.location.href = '/login';
  }

  const isStudentsPage = location.pathname === '/students';

  return (
    <div className="min-h-screen flex flex-col text-slate-800">
      <header className="bg-gradient-to-r from-amber-900 via-stone-800 to-slate-900 text-white shadow-xl border-b border-amber-100/20">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <button
              type="button"
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="md:hidden text-2xl rounded-lg p-2 hover:bg-white/10 transition"
              onClick={() => setOpen(!open)}
            >
              ☰
            </button>

            <div>
              <h1 className="text-xl md:text-3xl font-semibold tracking-wide">
                Student Management
              </h1>
              <p className="text-sm text-stone-200 hidden md:block">Classic administration dashboard</p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={handlelogout}
              className="bg-white/15 hover:bg-white/25 text-white px-4 py-2 rounded-lg transition font-medium backdrop-blur-sm border border-white/20"
            >
              Logout
            </button>
          </div>
        </div>

        {open && (
          <div id="mobile-menu" className="md:hidden border-t border-white/10 bg-stone-900/90 px-6 py-3 space-y-2">
            <Link
              to="/students"
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-2 text-sm font-medium text-stone-100 hover:bg-white/10"
            >
              Students
            </Link>
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                handlelogout();
              }}
              className="w-full text-left rounded-lg px-3 py-2 text-sm font-medium text-stone-100 hover:bg-white/10"
            >
              Logout
            </button>
          </div>
        )}
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6">
        <div className="card-surface rounded-2xl min-h-[75vh] p-6 md:p-8">
          {isStudentsPage ? (
            <Students students={students} loading={loading} error={error} />
          ) : (
            <Outlet />
          )}
        </div>
      </main>

      <footer className="bg-stone-900 text-stone-200 text-center py-4 text-sm border-t border-stone-800">
        © 2026 Student Management. All Rights Reserved.
      </footer>
    </div>
  );
}