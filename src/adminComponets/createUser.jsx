import React, { useState } from "react";
import api from "../middleware/axios.jsx";

function CreateUser() {
  const [parentNumber, setParentNumber] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState({ type: "", text: "" });
  const [loading, setLoading] = useState(false);

  const handleParentNumberChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 10);
    setParentNumber(value);
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();

    if (parentNumber.length !== 10) {
      setMessage({ type: "error", text: "Phone number must be exactly 10 digits" });
      return;
    }

    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const response = await api.post("/auth/signup", {
        parentNumber,
        password,
      });

      setMessage({
        type: "success",
        text: response.data?.message || "User created successfully",
      });
      setParentNumber("");
      setPassword("");
    } catch (error) {
      setMessage({
        type: "error",
        text: error.response?.data?.message || "Failed to create user",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Create New Parent</h2>
      </div>

      <form onSubmit={handleCreateUser} className="space-y-4">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <input
            type="tel"
            value={parentNumber}
            onChange={handleParentNumberChange}
            placeholder="Enter phone number"
            maxLength={10}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200 disabled:opacity-60"
        >
          {loading ? "Creating..." : "Create User"}
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

export default CreateUser;