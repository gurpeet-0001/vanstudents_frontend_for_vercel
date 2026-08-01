import React, { useState } from "react";
import api from "../middleware/axios.jsx";

function AddStudent() {
  const [stdName, setStdName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState({ type: "", text: "" });
  const [loading, setLoading] = useState(false);

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 10);
    setPhoneNumber(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (phoneNumber.length !== 10) {
      setMessage({ type: "error", text: "Phone number must be exactly 10 digits" });
      return;
    }

    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const response = await api.post("/students/", {
        std_name: stdName,
        phoneNumber,
      });

      setMessage({
        type: "success",
        text: response.data?.message || "Student added successfully",
      });
      setStdName("");
      setPhoneNumber("");
    } catch (error) {
      setMessage({
        type: "error",
        text: error.response?.data?.message || "Failed to add student",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Add Student</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Student Name
          </label>
          <input
            type="text"
            value={stdName}
            onChange={(e) => setStdName(e.target.value)}
            placeholder="Enter student name"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Parent Phone Number
          </label>
          <input
            type="tel"
            value={phoneNumber}
            onChange={handlePhoneChange}
            placeholder="Enter parent phone number"
            maxLength={10}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200 disabled:opacity-60"
        >
          {loading ? "Saving..." : "Add Student"}
        </button>
      </form>

      {message.text && (
        <div
          className={`mt-4 rounded-lg px-4 py-3 text-sm ${
            message.type === "success"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {message.text}
        </div>
      )}
    </div>
  );
}

export default AddStudent;