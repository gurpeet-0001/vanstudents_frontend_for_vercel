import React from 'react';
import { Link } from 'react-router-dom';

export default function Dashboard({ students, loading, error }) {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Students</h2>

      {loading && <p>Loading students...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && students.length === 0 && <p>No students found.</p>}

      <ul className="space-y-2 mt-4">
        {students.map((student) => (
          <li key={student.id} className="border rounded-lg p-3 flex justify-between items-center bg-white shadow-sm">
            <p>{student.std_name || 'Undefined Student'}</p>
            <Link to={`/fees/${student.id}`} className="text-blue-500 hover:underline">
              Show Fee
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
