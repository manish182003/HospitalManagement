import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const MyAppointment = () => {
  const {
    appointments,
    getAppointments,
    cancelAppointments,
    token,
    userData,
    loadUserProfileData,
  } = useContext(AppContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Upcoming");

  const tabs = ["Upcoming", "Ongoing", "Completed", "Cancelled"];
  useEffect(() => {
    const localToken = localStorage.getItem("token")
      ? localStorage.getItem("token")
      : false;
    const fetchUser = async () => {
      if (localToken) {
        await loadUserProfileData();
      } else {
        navigate("/");
      }
    };

    fetchUser();
  }, []);

  // 2. Once userData is available, fetch appointments
  useEffect(() => {
  if (userData && userData._id && token) {
    getAppointments(userData._id, activeTab, 1);
  }
}, [activeTab, userData, token]);


  const formatDate = (date) => {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (time, isEnd = false) => {
    const timeObj = new Date(time);
    if (isEnd) timeObj.setMinutes(timeObj.getMinutes() + 30);

    return timeObj.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const cancelAppointment = async (id) => {
    try {
      await cancelAppointments(id);

      getAppointments(id, activeTab, 1);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-zinc-700 mb-6">My Appointments</h2>

      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 rounded-full border transition-all duration-300 ${
              activeTab === tab
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-zinc-600 border-zinc-300 hover:bg-zinc-100"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Appointment Cards */}
      <div className="space-y-4">
        {Array.isArray(appointments) && appointments.length > 0 ? (
          appointments.map((item, index) => (
            <div
              key={index}
              className="border rounded-lg p-4 flex flex-col sm:flex-row gap-4 shadow-sm hover:shadow-md transition"
            >
              <img
                className="w-32 h-32 object-cover rounded border"
                src={item.doctorId.image}
                alt="Doctor"
              />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-zinc-800">
                  {item.name}
                </h3>
                <p className="text-sm text-zinc-600">
                  {item.doctorId.speciality}
                </p>
                <p className="mt-2 text-sm text-zinc-700 font-medium">
                  Address:
                </p>
                <p className="text-sm text-zinc-500">{item.doctorId.address}</p>
                <p className="mt-2 text-sm">
                  <span className="font-medium text-zinc-700">
                    Date & Time:
                  </span>{" "}
                  {formatDate(item.date)} | {formatTime(item.startTime)} -{" "}
                  {formatTime(item.startTime, true)}
                </p>
              </div>

              {/* Action Button */}
              <div className="flex flex-col justify-center items-end gap-2">
                {activeTab != "Cancelled" && (
                  <button
                    onClick={() => cancelAppointment(item._id)}
                    className="text-sm px-4 py-2 border rounded text-red-600 border-red-600 hover:bg-red-600 hover:text-white transition"
                  >
                    Cancel Appointment
                  </button>
                )}
                {activeTab == "Cancelled" && (
                  <span className="text-sm text-red-500 font-medium">
                    Appointment Cancelled
                  </span>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm">No appointments found.</p>
        )}
      </div>
    </div>
  );
};

export default MyAppointment;
