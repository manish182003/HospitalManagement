import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Doctors from "./pages/Doctors";
import MyAppointment from "./pages/MyAppointment";
import AdminLogin from "./pages/AdminLogin";
import About from "./pages/About";
import MyProfile from "./pages/MyProfile";
import Appointment from "./pages/Appointment";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useContext } from "react";
import { AdminAppContext } from "./context/AdminAppContext";
import AdminNavbar from "./components/AdminNavbar";
import Slidebar from "./components/Sidebar";
import Dashboard from "./pages/Admin/Dashboard";
import AllApointment from "./pages/Admin/AllApointment";
import AddDoctor from "./pages/Admin/AddDoctor";
import DoctorList from "./pages/Admin/DoctorList";
import { ToastContainer } from "react-toastify";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import ResetPassword from "./pages/RestPassword.jsx";
import { DoctorContext } from "./context/DoctorContext.jsx";
import DoctorDashboard from "./pages/Doctor/DoctorDashboard.jsx";
import DoctorAppointment from "./pages/Doctor/DoctorAppointment.jsx";
import { useEffect } from "react";
import { useState } from "react";

const App = () => {
  const { aToken, setAToken } = useContext(AdminAppContext);
  const { dToken, setDToken } = useContext(DoctorContext);
  const [loading, setLoading] = useState(true);

  //====================Sync context tokens from localStorage on app load=======================================================================
  useEffect(() => {
    const storedAToken = localStorage.getItem("aToken");
    const storedDToken = localStorage.getItem("dToken");
    if (storedAToken) setAToken(storedAToken);
    if (storedDToken) setDToken(storedDToken);
    setLoading(false);
    console.log("dToken:", dToken);
  }, [setAToken, setDToken]);

  if (loading) return <div className="text-center mt-20">Loading...</div>;
  return (
    <div className="mx-4 sm:mx-[10%]">
      {aToken ? (
        <>
          <AdminNavbar />
          <div className="bg-gray-100 rounded-md">
            <div className="flex  items-start">
              <Slidebar />
              <Routes>
                <Route path="/" element={<></>} />
                <Route path="/admin-dashboard" element={<Dashboard />} />
                <Route path="/all-appointment" element={<AllApointment />} />
                <Route path="/add-doctor" element={<AddDoctor />} />
                <Route path="/doctor-list" element={<DoctorList />} />
              </Routes>
            </div>
          </div>
        </>
      ) : dToken ? (
        <>
          <AdminNavbar />
          <div className="bg-gray-100 rounded-md">
            <div className="flex  items-start">
              <Slidebar />
              <Routes>
                <Route path="/" element={<Navigate to="/doctor-dashboard" />} />
                <Route
                  path="/doctor-appointment"
                  element={<DoctorAppointment />}
                />
                <Route path="/doctor-list" element={<DoctorList />} />
              </Routes>
            </div>
          </div>
        </>
      ) : (
        <Navbar />
      )}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/doctor" element={<Doctors />} />
        <Route path="/doctor/:speciality" element={<Doctors />} />
        <Route
          path="/login"
          element={
            aToken ? (
              <Navigate to="/admin-dashboard" />
            ) : dToken ? (
              <Navigate to="/doctor-dashboard" />
            ) : (
              <Login />
            )
          }
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<About />} />
        <Route path="/my-profile" element={<MyProfile />} />
        <Route path="/my-appointment" element={<MyAppointment />} />
        <Route path="/appointment/:docId" element={<Appointment />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        {/* <Route path="/chatbot" element={<Chatbot />} /> */}
        {/* 
        <Route
          path="/admin/adminlogin"
          element={
            aToken ? (
              <Navigate to="/admin-dashboard" />
            ) : dToken ? (
              <Navigate to="/doctor-dashboard" />
            ) : (
              <AdminLogin />
            )
          }
        /> */}
      </Routes>

      <ToastContainer />
      <Footer />
    </div>
  );
};
export default App;
