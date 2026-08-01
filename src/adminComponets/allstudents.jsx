import React, { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import api from '../middleware/axios'

function Allstudents() {
  const [students, setStudents] = useState([]);
  const [loadingStudents, setLoadingStudents] = useState(false);
  const [studentsError, setStudentsError] = useState(null);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let mounted = true;

    const fetchStudents = async () => {
      setLoadingStudents(true);
      setStudentsError(null);

      try {
        const res = await api.get('/students');
        if (!mounted) return;

        const data = Array.isArray(res.data) ? res.data : res.data.students || [];
        data.sort((a, b) => (a.name || '').toString().localeCompare((b.name || '').toString(), undefined, { sensitivity: 'base' }));
        setStudents(data);
      } catch (err) {
        if (!mounted) return;
        setStudentsError(err.message || 'Failed to load students');
      } finally {
        if (mounted) setLoadingStudents(false);
      }
    };

    fetchStudents();

    return () => {
      mounted = false;
    };
  }, [location.key]);

  const filtered = useMemo(() => {
    const q = (query || '').trim().toLowerCase();
    if (!q) return students;
    return students.filter(s => {
      const name = (s.name || '').toLowerCase();
      const phone = (s.phone || '').toString().toLowerCase();
      return name.includes(q) || phone.includes(q);
    });
  }, [students, query]);

  const openDetails = (std_id) => {
    // navigate to edit/details route for the student
    navigate(`/admin/students/${std_id}`);
  };

  return (
    <div className="p-2">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-semibold">All Students</h2>
          <p className="text-sm text-gray-500">{students.length} students</p>
        </div>

        <div className="w-full md:w-64">
          <input
            className="border px-3 py-2 rounded w-full"
            placeholder="Search by name or phone"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      {loadingStudents && <div className="text-gray-600">Loading students...</div>}

      {studentsError && <div className="text-red-500">{studentsError}</div>}

      {!loadingStudents && !studentsError && filtered.length === 0 && (
        <div className="text-gray-500">No students found.</div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((s) => (
          <div key={s.std_id || s.id} className="border rounded-xl p-4 shadow-sm bg-white">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold text-lg">{s.std_name || '—'}</div>
                <div className="text-sm text-gray-600">{s.phoneNumber || '—'}</div>
              </div>
              <div>
                <button
                  onClick={() => openDetails(s.std_id || s.id)}
                  className="bg-emerald-600 text-white px-3 py-1 rounded hover:bg-emerald-700"
                >
                  See More
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Allstudents;