import React, { useEffect, useState } from 'react'
import { useParams, useOutletContext } from 'react-router-dom'
import api from '../middleware/axios'

export default function EditStudents() {
    const { id } = useParams();
    useOutletContext();

    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [newFee, setNewFee] = useState({
        fee: '',
        year: '',
        from_month: '',
        to_month: ''
    });

    const [adding, setAdding] = useState(false);
    const [editingFeeId, setEditingFeeId] = useState(null);
    const [editingFeeValue, setEditingFeeValue] = useState('');
    const [editingFeeYear, setEditingFeeYear] = useState('');
    const [editingFeeFromMonth, setEditingFeeFromMonth] = useState('');
    const [editingFeeToMonth, setEditingFeeToMonth] = useState('');
    const [updating, setUpdating] = useState(false);

    const fetchStudent = async () => {
        setLoading(true);
        setError(null);

        try {
            const res = await api.get(`/students/${id}`);
            setStudent(res.data);
        } catch (err) {
            setError(
                err?.response?.data?.message ||
                err.message ||
                'Failed to load student'
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!id) return;
        fetchStudent();
    }, [id]);

    const handleAddFee = async (e) => {
        e.preventDefault();
        setAdding(true);
        setError(null);

        try {
            const payload = {
                fee: newFee.fee || null,
                year: newFee.year || null,
                from_month: newFee.from_month || null,
                to_month: newFee.to_month || null,
            };

            await api.post(`/students/${id}`, payload);

            setNewFee({
                fee: '',
                year: '',
                from_month: '',
                to_month: '',
            });

            await fetchStudent();
        } catch (err) {
            setError(
                err?.response?.data?.message ||
                err.message ||
                'Failed to add fee'
            );
        } finally {
            setAdding(false);
        }
    };

    const startEdit = (fee) => {
        setEditingFeeId(fee.id);
        setEditingFeeValue(fee.fee == null ? '' : String(fee.fee));
        setEditingFeeYear(fee.year == null ? '' : String(fee.year));
        setEditingFeeFromMonth(fee.from_month == null ? '' : String(fee.from_month));
        setEditingFeeToMonth(fee.to_month == null ? '' : String(fee.to_month));
    };

    const cancelEdit = () => {
        setEditingFeeId(null);
        setEditingFeeValue('');
        setEditingFeeYear('');
        setEditingFeeFromMonth('');
        setEditingFeeToMonth('');
    };

    const saveEdit = async (feeId) => {
        setUpdating(true);
        setError(null);

        try {
            await api.put(`/students/${id}`, {
                feeId,
                fee: editingFeeValue || null,
                year: editingFeeYear || null,
                from_month: editingFeeFromMonth || null,
                to_month: editingFeeToMonth || null,
            });

            await fetchStudent();
            cancelEdit();
        } catch (err) {
            setError(
                err?.response?.data?.message ||
                err.message ||
                'Failed to update fee'
            );
        } finally {
            setUpdating(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[200px] text-gray-600">
                Loading student...
            </div>
        );
    }

    return (
        <div className="p-6 bg-gray-50 min-h-screen">

            {error && (
                <div className="mb-4 text-red-500">
                    {error}
                </div>
            )}

            {student && (
                <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">

                    {/* Header */}
                    <div className="bg-gradient-to-r from-slate-700 via-slate-800 to-slate-900 text-white shadow-xl border-b border-amber-100/20 p-6">
                        <h2 className="text-3xl font-bold">
                            Edit Student
                        </h2>

                        <p className="mt-2 text-blue-100">
                            Manage fees for {student.std_name}
                        </p>
                    </div>

                    {/* Student Info + Add Fee */}
                    <div className="p-6 grid md:grid-cols-2 gap-6">

                        {/* Student Info */}
                        <div className="bg-blue-50 rounded-xl p-5 border border-blue-100">

                            <h3 className="text-lg font-semibold text-gray-800 mb-4">
                                Student Information
                            </h3>

                            <div className="space-y-2 text-gray-700">

                                <p>
                                    <span className="font-medium">
                                        Name:
                                    </span>{' '}
                                    {student.std_name || 'N/A'}
                                </p>

                                <p>
                                    <span className="font-medium">
                                        Student ID:
                                    </span>{' '}
                                    {student.id || 'N/A'}
                                </p>

                                <p>
                                    <span className="font-medium">
                                        Phone:
                                    </span>{' '}
                                    {student.phoneNumber || 'N/A'}
                                </p>

                                <p>
                                    <span className="font-medium">
                                        Created At:
                                    </span>{' '}
                                    {student.created_at
                                        ? new Date(student.created_at).toLocaleDateString()
                                        : 'N/A'}
                                </p>

                            </div>

                        </div>

                        {/* Add Fee */}
                        <div className="bg-green-50 rounded-xl p-5 border border-green-100">

                            <h3 className="text-lg font-semibold text-gray-800 mb-5">
                                Add New Fee
                            </h3>

                            <form
                                onSubmit={handleAddFee}
                                className="space-y-4"
                            >

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Fee
                                    </label>

                                    <input
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-500"
                                        value={newFee.fee}
                                        onChange={(e) =>
                                            setNewFee(prev => ({
                                                ...prev,
                                                fee: e.target.value
                                            }))
                                        }
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Year
                                    </label>

                                    <input
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-500"
                                        value={newFee.year}
                                        onChange={(e) =>
                                            setNewFee(prev => ({
                                                ...prev,
                                                year: e.target.value
                                            }))
                                        }
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        From Month
                                    </label>

                                    <input
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-500"
                                        value={newFee.from_month}
                                        onChange={(e) =>
                                            setNewFee(prev => ({
                                                ...prev,
                                                from_month: e.target.value
                                            }))
                                        }
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        To Month
                                    </label>

                                    <input
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-500"
                                        value={newFee.to_month}
                                        onChange={(e) =>
                                            setNewFee(prev => ({
                                                ...prev,
                                                to_month: e.target.value
                                            }))
                                        }
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={adding}
                                    className="bg-slate-800 hover:bg-slate-900 text-white px-5 py-2 rounded-lg transition disabled:opacity-50"
                                >
                                    {adding ? 'Adding...' : 'Add Fee'}
                                </button>

                            </form>

                        </div>

                    </div>

                    {/* Fee Records */}
                    <div className="px-6 pb-6">

                        <h3 className="text-xl font-semibold text-gray-800 mb-4">
                            Fee Records
                        </h3>

                        {Array.isArray(student.Fees) && student.Fees.length > 0 ? (

                            <>
                                <p className="text-xs text-gray-500 mb-2 md:hidden">
                                    Swipe horizontally to view all columns
                                </p>

                                <div className="overflow-x-auto rounded-xl border border-gray-200">

                                    <table className="min-w-[900px] w-full divide-y divide-gray-200 bg-white">

                                        <thead className="bg-gray-100">
                                            <tr>
                                                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Fee</th>
                                                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Year</th>
                                                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">From Month</th>
                                                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">To Month</th>
                                                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Action</th>
                                            </tr>
                                        </thead>

                                        <tbody className="divide-y divide-gray-200">

                                            {student.Fees.map((f) => (

                                                <tr
                                                    key={f.id}
                                                    className="hover:bg-gray-50"
                                                >
                                                    <td className="px-4 py-3 text-sm text-gray-700">
                                                        {editingFeeId === f.id ? (
                                                            <input
                                                                value={editingFeeValue}
                                                                onChange={(e) =>
                                                                    setEditingFeeValue(e.target.value)
                                                                }
                                                                className="w-28 border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-slate-500"
                                                            />
                                                        ) : (
                                                            f.fee ?? 'N/A'
                                                        )}
                                                    </td>

                                                    <td className="px-4 py-3 text-sm text-gray-700">
                                                        {editingFeeId === f.id ? (
                                                            <input
                                                                value={editingFeeYear}
                                                                onChange={(e) => setEditingFeeYear(e.target.value)}
                                                                className="w-28 border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-slate-500"
                                                            />
                                                        ) : (
                                                            f.year ?? 'N/A'
                                                        )}
                                                    </td>

                                                    <td className="px-4 py-3 text-sm text-gray-700">
                                                        {editingFeeId === f.id ? (
                                                            <input
                                                                value={editingFeeFromMonth}
                                                                onChange={(e) => setEditingFeeFromMonth(e.target.value)}
                                                                className="w-28 border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-slate-500"
                                                            />
                                                        ) : (
                                                            f.from_month ?? 'N/A'
                                                        )}
                                                    </td>

                                                    <td className="px-4 py-3 text-sm text-gray-700">
                                                        {editingFeeId === f.id ? (
                                                            <input
                                                                value={editingFeeToMonth}
                                                                onChange={(e) => setEditingFeeToMonth(e.target.value)}
                                                                className="w-28 border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-slate-500"
                                                            />
                                                        ) : (
                                                            f.to_month ?? 'N/A'
                                                        )}
                                                    </td>

                                                    <td className="px-4 py-3 text-sm">

                                                        {editingFeeId === f.id ? (
                                                            <div className="flex gap-2">

                                                                <button
                                                                    onClick={() => saveEdit(f.id)}
                                                                    disabled={updating}
                                                                    className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md"
                                                                >
                                                                    Save
                                                                </button>

                                                                <button
                                                                    onClick={cancelEdit}
                                                                    className="bg-gray-300 hover:bg-gray-400 px-3 py-1 rounded-md"
                                                                >
                                                                    Cancel
                                                                </button>

                                                            </div>
                                                        ) : (
                                                            <button
                                                                onClick={() => startEdit(f)}
                                                                className="bg-slate-700 hover:bg-slate-800 text-white px-3 py-1 rounded-md"
                                                            >
                                                                Edit
                                                            </button>
                                                        )}

                                                    </td>

                                                </tr>

                                            ))}

                                        </tbody>

                                    </table>

                                </div>
                            </>
                        ) : (
                            <div className="text-gray-500 border rounded-lg p-4 bg-gray-50">
                                No fee records found.
                            </div>
                        )}

                    </div>

                </div>
            )}

        </div>
    );
}