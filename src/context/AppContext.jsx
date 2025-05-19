import { createContext, useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

// App Context
export const AppContext = createContext();
const AppContextProvider = (props) => {
  const currencySymbol = "INR ";
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [doctors, setdoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [paymentOrder, setPaymentOrder] = useState();
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : false
  );
  const [userData, setUserData] = useState();

  const getDoctorData = async () => {
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

  const createOrderPayment = async (
    amount,
    currency,
    receipt,
    appointmentData
  ) => {
    const toastId = toast.loading("Opening Payment Gateway...");
    const docInfo = doctors.find((doc) => doc._id === appointmentData.doctorId);
    if (!docInfo || !docInfo.available) {
      toast.update(toastId, {
        render: "Doctor not available for booking",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
      return;
    }
    try {
      console.log(backendUrl + "api/payment/create-order");
      console.log({
        amount,
        currency,
        receipt,
        appointmentData,
      });

      const { data } = await axios.post(
        backendUrl + "api/payment/create-order",
        {
          amount: amount,
          //   "currency":"INR",
          receipt: "appointment_001",
          appointmentData: {
            doctorId: appointmentData.doctorId,
            patientId: appointmentData.patientId,
            bookingDate: appointmentData.bookingDate,
            startTime: appointmentData.startTime,
            endTime: appointmentData.endTime,
          },
        },

        //   // appointmentData,
        // },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("----------------data------------------  ", data);
      if (data && data.success) {
        console.log(data.data);
        setPaymentOrder(data.data);
        toast.update(toastId, {
          type: "success",
          isLoading: false,
          autoClose: 1,
        });
      }
    } catch (error) {
      toast.update(toastId, {
        type: "error",
        isLoading: false,
        autoClose: 1,
      });
      if (error.response && error.response.data) {
        console.log("backend error->", error.response.data);
        toast.error(error.response.data.message || "Server returned an error");
      } else {
        console.log("axios/network error->", error.message);
        toast.error("Network or unexpected error: " + error.message);
      }
    }
  };

  useEffect(() => {
    if (paymentOrder) {
      console.log("Received payment order ID:", paymentOrder);
      // Optionally, initialize Razorpay here
    }
  }, [paymentOrder]);

  const verifyOrderPayment = async (
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    amount,
    appointmentData
  ) => {
    const toastId = toast.loading("Processing payment...");
    try {
      const { data } = await axios.post(
        backendUrl + "api/payment/verify-payment",
        {
          razorpay_order_id,
          razorpay_payment_id,
          razorpay_signature,
          amount,
          appointmentData: {
            doctorId: appointmentData.doctorId,
            patientId: appointmentData.patientId,
            bookingDate: appointmentData.bookingDate,
            startTime: appointmentData.startTime,
            endTime: appointmentData.endTime,
            reason: appointmentData.reason,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (data.status == "success") {
        console.log(data.data);
        setAppointments(data.data);
        toast.update(toastId, {
          render: "Payment successful & appointment booked 🎉",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
        setPaymentOrder();
      }
    } catch (error) {
      toast.update(toastId, {
        render: "Payment failed ❌",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
      if (error.response && error.response.data) {
        console.log("backend error->", error.response.data);
        toast.error(error.response.data.message || "Server returned an error");
      } else {
        console.log("axios/network error->", error.message);
        toast.error("Network or unexpected error: " + error.message);
      }
    }
  };

  const getAppointments = async (patientId, status, page = 1) => {
    try {
      setAppointments();
      console.log(userData);
      const { data } = await axios.get(
        backendUrl +
          `api/user/getAppointments/${patientId}?status=${status}&page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ Correct placement
          },
        }
      );
      console.log(data);
      if (data.success) {
        setAppointments(data.data);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const cancelAppointments = async (appointmentId) => {
    try {
      console.log(token);
      const { data } = await axios.post(
        backendUrl + `api/payment/refund`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ Correct placement
          },
        },
        {
          appointmentId: appointmentId,
        }
      );
      console.log(data);
      if (data.success) {
        toast.success(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const loadUserProfileData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "api/user/profile", {
        headers: {
          Authorization: `Bearer ${token}`, // ✅ Correct placement
        },
      });
      if (data.success) {
        setUserData(data.profile);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const calculateAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    return age;
  };
  const months = [
    "",
    "jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const slotDateFormat = (slotDate) => {
    const DateArray = slotDate.split("_");
    return (
      DateArray[0] + " " + months[Number(DateArray[1])] + " " + DateArray[2]
    );
  };

  const value = {
    doctors,
    getDoctorData,
    currencySymbol,
    token,
    setToken,
    backendUrl,
    userData,
    appointments,
    setAppointments,
    paymentOrder,
    setPaymentOrder,
    setUserData,
    loadUserProfileData,
    calculateAge,
    slotDateFormat,
    createOrderPayment,
    verifyOrderPayment,
    getAppointments,
    cancelAppointments,
  };

  useEffect(() => {
    getDoctorData();
  }, []);
  useEffect(() => {
    if (token) {
      loadUserProfileData();
    }
  }, [token]);
  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

// Admin Context (separate)
export const AdminContext = createContext();
const AdminContextProvider = (props) => {
  const value = {};
  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

// AppContextProvider prop types
AppContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// AdminContextProvider prop types
AdminContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AppContextProvider, AdminContextProvider };
