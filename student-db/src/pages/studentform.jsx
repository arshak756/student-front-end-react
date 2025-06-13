import { useState, useEffect } from "react";
import axios from "axios";

const StudentForm = ({ fetchStudents, editingStudent, setEditingStudent }) => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    course: "",
    grade: "",
  });

  useEffect(() => {
    if (editingStudent) {
      setFormData(editingStudent);
    }
  }, [editingStudent]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingStudent) {
        await axios.put(
          `http://localhost:5000/students/${editingStudent._id}`,
          formData
        );
        setEditingStudent(null);
      } else {
        await axios.post("http://localhost:5000/students", formData);
      }
      setFormData({ name: "", age: "", course: "", grade: "" });
      fetchStudents();
    } catch (err) {
      console.error("Form submission error:", err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 shadow-lg rounded-2xl max-w-lg mx-auto space-y-4 border border-gray-200"
    >
      <h2 className="text-2xl font-bold text-gray-800">
        {editingStudent ? "✏️ Edit Student" : "➕ Add Student"}
      </h2>

      <div>
        <label className="block text-gray-600 font-medium mb-1">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter student name"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
      </div>

      <div>
        <label className="block text-gray-600 font-medium mb-1">Age</label>
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          placeholder="Enter age"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
      </div>

      <div>
        <label className="block text-gray-600 font-medium mb-1">Course</label>
        <input
          type="text"
          name="course"
          value={formData.course}
          onChange={handleChange}
          placeholder="Enter course name"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
      </div>

      <div>
        <label className="block text-gray-600 font-medium mb-1">Grade</label>
        <input
          type="text"
          name="grade"
          value={formData.grade}
          onChange={handleChange}
          placeholder="Enter grade"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
      </div>

      <div className="flex justify-between items-center">
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          {editingStudent ? "Update" : "Add"} Student
        </button>

        {editingStudent && (
          <button
            type="button"
            onClick={() => {
              setEditingStudent(null);
              setFormData({ name: "", age: "", course: "", grade: "" });
            }}
            className="text-red-500 underline hover:text-red-600 transition"
          >
            Cancel Edit
          </button>
        )}
      </div>
    </form>
  );
};

export default StudentForm;
