import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function StudentList() {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  const fetchStudents = async () => {
    try {
      const res = await axios.get("http://localhost:5000/students");
      setStudents(res.data);
    } catch (err) {
      console.error("Error fetching students:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/students/${id}`);
      fetchStudents();
    } catch (err) {
      console.error("Error deleting student:", err);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-xl shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-blue-700">🎓 Student List</h2>
          <button
            onClick={() => navigate("/add")}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
          >
            + Add Student
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border rounded-xl overflow-hidden shadow-sm text-sm">
            <thead className="bg-blue-100 text-blue-900 font-semibold">
              <tr>
                <th className="p-3 border">Name</th>
                <th className="p-3 border">Age</th>
                <th className="p-3 border">Course</th>
                <th className="p-3 border">Grade</th>
                <th className="p-3 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s) => (
                <tr key={s._id} className="text-center hover:bg-gray-100">
                  <td className="p-3 border">{s.name}</td>
                  <td className="p-3 border">{s.age}</td>
                  <td className="p-3 border">{s.course}</td>
                  <td className="p-3 border">{s.grade}</td>
                  <td className="p-3 border space-x-2">
                    <button
                      onClick={() => navigate(`/edit/${s._id}`)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-lg"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(s._id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {students.length === 0 && (
                <tr>
                  <td colSpan="5" className="p-4 text-center text-gray-500">
                    No students found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
