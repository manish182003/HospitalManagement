import { useContext, useEffect } from "react";
import { AdminAppContext } from "../../context/AdminAppContext";
import { AppContext } from "../../context/AppContext";

const AllApointment = () => {
  const { aToken, appointments, getAllAppointments } =
    useContext(AdminAppContext);
  const { currencySymbol } = useContext(AppContext);
  
  useEffect(() => {
    if (aToken) {
      getAllAppointments();
    }
  }, [aToken]);

  // Helper to format date in YYYY-MM-DD format
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toISOString().split("T")[0];
  };

  return (
    <div className="w-full m-5 max-w-6xl">
      <p className="mb-3 text-lg font-medium">All Appointments</p>

      <div className="bg-white border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll">
        <div className="hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] py-3 px-6 border-b">
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date</p>
          <p>Doctor</p>
          <p>Fees</p>
        </div>

        {appointments.length === 0 ? (
          <p className="text-center text-gray-500 py-10">No appointments found.</p>
        ) : (
          appointments.map((item, index) => (
            <div
              key={item._id}
              className="flex flex-wrap justify-between sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] text-gray-500 py-3 px-6 border-b"
            >
              <p className="max-sm:hidden">{index + 1}</p>

              <p>{item.patient?.name || "N/A"}</p>

              <p className="max-sm:hidden">{item.patient?.age ?? "N/A"}</p>

              <p>{formatDate(item.date)}</p>

              <p>{item.doctor?.name || "N/A"}</p>

              <p>
                {currencySymbol}
                {item.doctor?.fees ?? "0"}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AllApointment;
