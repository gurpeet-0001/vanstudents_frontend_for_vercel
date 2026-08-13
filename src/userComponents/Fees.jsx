import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../middleware/axios';

export default function Fees() {
    const { id } = useParams();
    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchStudent = async () => {
            try {
                setLoading(true);
                const response = await api.get(`/students/${id}`);
                setStudent(response.data?.student || response.data);
                setError('');
            } catch (err) {
                setError('Failed to load student details.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchStudent();
        }
    }, [id]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[200px] text-gray-600">
                Loading fees...
            </div>
        );
    }

    if (error) {
        return <div className="text-red-500 p-4">{error}</div>;
    }

    if (!student) {
        return <div className="p-4">No student found.</div>;
    }

    const fees = student.Fees || [];

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-slate-700 via-slate-800 to-slate-900 text-white shadow-xl border-b border-amber-100/20 p-3 ">
                    <h2 className="text-2md ">Student Fee Details for {student.std_name || 'Student'}</h2>
                </div>

                <div className="p-6 grid md:grid-cols-2 gap-6">
                    <div className="bg-blue-50 rounded-xl p-5 border border-blue-100">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Student Information</h3>
                        <div className="space-y-2 text-gray-700">
                            <p><span className="font-medium">Name:</span> {student.std_name || 'N/A'}</p>
                            <p><span className="font-medium">Student ID:</span> {student.id || 'N/A'}</p>
                            <p><span className="font-medium">Phone:</span> {student.phoneNumber || 'N/A'}</p>
                            <p><span className="font-medium">Created At:</span> {student.created_at ? new Date(student.created_at).toLocaleDateString() : 'N/A'}</p>
                        </div>
                    </div>

                    <div className="bg-green-50 rounded-xl p-5 border border-green-100">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Fee Summary</h3>
                        <div className="space-y-2 text-gray-700">
                            <p><span className="font-medium">Total Records:</span> {fees.length}</p>
                            <p><span className="font-medium">Latest Fee:</span> {fees[0]?.fee ?? 'N/A'}</p>
                        </div>
                    </div>
                </div>

                <div className="px-6 pb-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Fee Records</h3>

                    {fees.length === 0 ? (
                        <div className="text-gray-500 border rounded-lg p-4 bg-gray-50">
                            No fee records found.
                        </div>
                    ) : (
                        <>
                            <p className="text-xs text-gray-500 mb-2 md:hidden">Swipe horizontally to view all fee columns</p>
                            <div className="overflow-x-auto rounded-xl border border-gray-200">
                                <table className="min-w-[640px] w-full divide-y divide-gray-200 bg-white">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Fee</th>
                                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Year</th>
                                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">From Month</th>
                                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">To Month</th>
                                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Created At</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {fees.map((fee) => (
                                        <tr key={fee.id} className="hover:bg-gray-50">
                                            <td className="px-4 py-3 text-sm text-gray-700">{fee.fee ?? 'N/A'}</td>
                                            <td className="px-4 py-3 text-sm text-gray-700">{fee.year ?? 'N/A'}</td>
                                            <td className="px-4 py-3 text-sm text-gray-700">{fee.from_month ?? 'N/A'}</td>
                                            <td className="px-4 py-3 text-sm text-gray-700">{fee.to_month ?? 'N/A'}</td>
                                            <td className="px-4 py-3 text-sm text-gray-700">
                                                {fee.created_at ? new Date(fee.created_at).toLocaleString() : 'N/A'}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}