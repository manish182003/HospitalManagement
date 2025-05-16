import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AdminAppContext = createContext();

const AdminAppContextProvider = (props) => {
  const [aToken, setATokenState] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);

  const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  // Sync token from localStorage on load
  useEffect(() => {
    const storedToken = localStorage.getItem("adminToken");
    if (storedToken) {
      setATokenState(storedToken);
    }
  }, []);

  // Keep localStorage updated when token changes
  const setAToken = (token) => {
    setATokenState(token);
    localStorage.setItem("adminToken", token);
  };

  const getAllDoctors = async () => {
   try {
      const { data } = await axios.get(backendUrl + "api/doctor/all/doc");
      console.log(data);
      if (data.success) {
        setdoctors(data.data);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
// to be continued
  // const changeAvailability = async (docId) => {
  //   try {
  //     const { data } = await axios.post(
  //       `${backendUrl}/api/admin/change-availability`,
  //       { docId },
  //       { headers: { aToken } }
  //     );
  //     if (data.success) {
  //       toast.success(data.message);
  //       getAllDoctors();
  //     } else {
  //       toast.error(data.message);
  //     }
  //   } catch (error) {
  //     toast.error(error.message || "Error changing availability.");
  //   }  
  // };

const getAllAppointments = async () => {
  try {
    const { data } = await axios.get(`${backendUrl}api/admin/all-appointments`, {
      headers: { aToken },
    });
    // const { data } = await axios.get(`http://localhost:5000/api/admin/all-appointments`, {
    // headers: { aToken },
    // });   
    if (data.success) {
      setAppointments(data.appointments); // This updates context state
      console.log(data.appointments);
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error(error.message || "Failed to fetch appointments.");
  }
};

 const [dashData, setDashData] = useState(null);

const getDashData = async () => {
  try {
    const { data } = await axios.get(`${backendUrl}api/admin/dashboard`, {
      headers: { aToken },
    });

    if (data.success) {
      setDashData(data.data); // ✅ This stores the data in state!
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error(error.message || "Failed to fetch dashboard data.");
  }
};



  const value = {
    aToken,
    setAToken,
    backendUrl,
    doctors,
    getAllDoctors,
    // changeAvailability,
    appointments,
    setAppointments,
    getAllAppointments,
    dashData,
    // cancelAppointment,
    getDashData, 
  };

  return (
    <AdminAppContext.Provider value={value}>
      {props.children}
    </AdminAppContext.Provider>
  );
};

export default AdminAppContextProvider;
