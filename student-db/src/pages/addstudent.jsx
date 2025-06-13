import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function AddEditStudent() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    course: "",
    grade: "",
  });

  const fetchStudent = async () => {
    try {
      const res = await axios.get(` https://student-db-backend-mongodb-4.onrender.com${id}`);
      setFormData(res.data);
    } catch (err) {
      console.error("Failed to load student:", err);
    }
  };

  useEffect(() => {
    if (id) fetchStudent();
  }, [id]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await axios.put(` https://student-db-backend-mongodb-4.onrender.com${id}`, formData);
      } else {
        await axios.post(" https://student-db-backend-mongodb-4.onrender.com", formData);
      }
      navigate("/students");
    } catch (err) {
      console.error("Error submitting form:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">
          {id ? "✏️ Edit Student" : "➕ Add Student"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter student name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Age</label>
            <input
              type="number"
              name="age"
              placeholder="Enter age"
              value={formData.age}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Course</label>
            <input
              type="text"
              name="course"
              placeholder="Enter course"
              value={formData.course}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Grade</label>
            <input
              type="text"
              name="grade"
              placeholder="Enter grade"
              value={formData.grade}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200 font-semibold"
          >
            {id ? "Update Student" : "Add Student"}
          </button>
        </form>
      </div>
    </div>
  );
}
