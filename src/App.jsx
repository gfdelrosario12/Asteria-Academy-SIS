
import { Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register/Register";
import StudentHomePage from './pages/SIS/student/StudentHomePage';
import Seal from "./pages/about/Seal"
import VM from "./pages/about/VM"
import Administration from "./pages/about/Administration"
import Contact from "./pages/Contact/Contact";
import StudentGrades from "./pages/SIS/grades/StudentGrades";

function App() {

  return (
    <>
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/SIS/students" element={<StudentHomePage />} />
      <Route path="/SIS/administrators" element={<StudentHomePage />} />
      <Route path="/SIS/faculty" element={<StudentHomePage />} />
      <Route path="/about/seal" element={<Seal />} />
      <Route path="/about/vission-mission" element={<VM />} />
      <Route path="/about/developers" element={<Administration />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/SIS/student/grades" element={<StudentGrades />} />
    </Routes>
    </>
  )
}

export default App
