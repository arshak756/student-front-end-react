import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 via-white to-green-50 flex items-center justify-center">
      <div className="bg-white shadow-xl rounded-2xl p-10 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">🎓 Student Management System</h1>
        <p className="text-gray-500 mb-8">
          Manage, add, edit, and view students efficiently.
        </p>

        <div className="flex flex-col space-y-4">
          <Link
            to="/students"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
          >
            📋 View Students
          </Link>
          <Link
            to="/add"
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
          >
            ➕ Add Student
          </Link>
        </div>
      </div>
    </div>
  );
}


