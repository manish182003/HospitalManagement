import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLogin from "../pages/AdminLogin";
import AdminDashboard from "../pages/Admin/Dashboard"; // make sure this file exists
import AdminAppContextProvider from "../context/AdminAppContext";

function App() {
  return (
    <BrowserRouter>
      <AdminAppContextProvider>
        <Routes>
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          {/* Add other routes for doctor and patient */}
        </Routes>
      </AdminAppContextProvider>
    </BrowserRouter>
  );
}

export default App;
