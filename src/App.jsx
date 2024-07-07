import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register/Register";
import StudentHomePage from "./pages/SIS/student/StudentHomePage";
import Seal from "./pages/about/Seal";
import VM from "./pages/about/VM";
import Administration from "./pages/about/Administration";
import Contact from "./pages/Contact/Contact";
import StudentGrades from "./pages/SIS/grades/StudentGrades";
import AdministratorHomePage from "./pages/SIS/administrator/AdministratorHomePage";
import FacultyHomePage from "./pages/SIS/faculty/FacultyHomePage";
import AdminList from "./pages/SIS/administrator/list/AdminList";
import FacultyList from "./pages/SIS/administrator/list/FacultyList";
import ClassList from "./pages/SIS/administrator/list/ClassList";
import StudentList from "./pages/SIS/administrator/list/StudentList";
import UpdateClass from "./pages/SIS/administrator/Update/UpdateClass";
import UpdateAdministrator from "./pages/SIS/administrator/Update/UpdateAdministrator";
import UpdateFaculty from "./pages/SIS/administrator/Update/UpdateFaculty";
import UpdateStudent from "./pages/SIS/administrator/Update/UpdateStudent";
import CreateStudent from "./pages/SIS/administrator/Create/CreateStudent";
import CreateAdministrator from "./pages/SIS/administrator/Create/CreateAdministrator";
import CreateFaculty from "./pages/SIS/administrator/Create/CreateFaculty";
import CreateClass from "./pages/SIS/administrator/Create/CreateClass";
import StudentsInClass from "./pages/SIS/class_subject/StudentsInClass";
import UpdateGrades from "./pages/SIS/grades/UpdateGrades";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/SIS/students" element={<StudentHomePage />} />
        <Route path="/SIS/administrators" element={<AdministratorHomePage />} />
        <Route path="/SIS/faculty" element={<FacultyHomePage />} />
        <Route path="/about/seal" element={<Seal />} />
        <Route path="/about/vission-mission" element={<VM />} />
        <Route path="/about/developers" element={<Administration />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/SIS/student/grades" element={<StudentGrades />} />
        <Route path="/SIS/get/students" element={<StudentList />} />
        <Route path="/SIS/get/admin" element={<AdminList />} />
        <Route path="/SIS/get/faculty" element={<FacultyList />} />
        <Route path="/SIS/get/classes" element={<ClassList />} />
        <Route path="/update-class/:id" element={<UpdateClass />} />
        <Route path="/update-admin/:id" element={<UpdateAdministrator />} />
        <Route path="/update-faculty/:id" element={<UpdateFaculty />} />
        <Route path="/update-student/:id" element={<UpdateStudent />} />
        <Route path="/SIS/create/student" element={<CreateStudent />} />
        <Route path="/SIS/create/admin" element={<CreateAdministrator />} />
        <Route path="/SIS/create/faculty" element={<CreateFaculty />} />
        <Route path="/SIS/create/class" element={<CreateClass />} />
        <Route path="/SIS/class-details/:id" element={<StudentsInClass />} />
        <Route path="/SIS/grades/:id" element={<UpdateGrades />} />
      </Routes>
    </>
  );
}

export default App;
