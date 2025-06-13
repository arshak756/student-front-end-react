import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import StudentList from "./pages/studentlist";
import AddStudent from "./pages/addstudent";
import EditStudent from "./pages/editstudent"; // 👈 Add this

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/students" element={<StudentList />} />
        <Route path="/add" element={<AddStudent />} />
        <Route path="/edit/:id" element={<EditStudent />} /> {/* 👈 New Route */}
      </Routes>
    </Router>
  );
}



