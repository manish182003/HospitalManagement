import { useContext, useEffect } from "react";
import { AdminAppContext } from "../../context/AdminAppContext";
import { assets } from "../../assets/assets";

const AdminDashboard = () => {
  const { aToken, getDashData, dashData } = useContext(AdminAppContext);

  useEffect(() => {
    if (aToken) {
      getDashData();
    }
  }, [aToken]);

  return (
    dashData && (
      <div className="m-5">
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
            <img className="w-14" src={assets.doctor_icon} alt="doctor" />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {dashData?.totalDoctors ?? 0}
              </p>
              <p className="text-gray-400">Doctors</p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
            <img className="w-14" src={assets.appointments_icon} alt="appointments" />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {dashData?.totalAppointments ?? 0}
              </p>
              <p className="text-gray-400">Appointments</p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
            <img className="w-14" src={assets.cancel_icon} alt="cancelled" />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {dashData?.cancelledAppointments ?? 0}
              </p>
              <p className="text-gray-400">Cancelled</p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
            <img className="w-14" src={assets.patients_icon} alt="patients" />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {dashData?.patients?.length ?? 0}
              </p>
              <p className="text-gray-400">Patients</p>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default AdminDashboard;
