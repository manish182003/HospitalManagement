import { useContext, useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom"; // Import useParams hook
import { AppContext } from "../context/AppContext";
import { AdminAppContext } from "../context/AdminAppContext";

const Doctors = () => {
  // const navigate = useNavigate();
  // const { speciality } = useParams();
  // const [showFilter, setShowFilter] = useState(false);
  // const [filterDoc, setFilterDoc] = useState([]);
  // const { doctors } = useContext(AppContext);

  // const applyFilter = useCallback(() => {
  //   if (speciality) {
  //     setFilterDoc(doctors.filter((doc) => doc.speciality === speciality));
  //   } else {
  //     console.log("done" + filterDoc);
  //     setFilterDoc(doctors);
  //   }
  // }, [filterDoc, doctors, speciality]);

  // useEffect(() => {
  //   console.log("doctors" + doctors);
  //   applyFilter();
  // }, [applyFilter, doctors]);

  // return (
  //   <div>
  //     <p className="text-gray-600">Browse through the doctors specialist.</p>
  //     <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">
  //       <button
  //         className={`py-1 px-3 border rounded text-sm transition-all sm:hidden cursor-pointer ${
  //           showFilter ? "bg-gray-400 text-white" : ""
  //         }`}
  //         onClick={() => setShowFilter((prev) => !prev)}
  //       >
  //         Filter
  //       </button>
  //       <div
  //         className={`flex-col gap-4 text-sm text-gray-600 ${
  //           showFilter ? "flex" : "hidden sm:flex"
  //         }`}
  //       >
  //         <p
  //           onClick={() =>
  //             speciality === "Physician"
  //               ? navigate("/doctor")
  //               : navigate("/doctor/Physician")
  //           }
  //           className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer hover:translate-y-[-10px] transition-all duration-500 ${
  //             speciality === "Physician" ? " bg-indigo-100 text-black" : ""
  //           }`}
  //         >
  //           General physician
  //         </p>
  //         <p
  //           onClick={() =>
  //             speciality === "Gynecologist"
  //               ? navigate("/doctor")
  //               : navigate("/doctor/Gynecologist")
  //           }
  //           className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer hover:translate-y-[-10px] transition-all duration-500 ${
  //             speciality === "Gynecologist" ? " bg-indigo-100 text-black" : ""
  //           }`}
  //         >
  //           Gynecologist
  //         </p>
  //         <p
  //           onClick={() =>
  //             speciality === "Dermatologist"
  //               ? navigate("/doctor")
  //               : navigate("/doctor/Dermatologist")
  //           }
  //           className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer hover:translate-y-[-10px] transition-all duration-500 ${
  //             speciality === "Dermatologist" ? " bg-indigo-100 text-black" : ""
  //           }`}
  //         >
  //           Dermatologist
  //         </p>
  //         <p
  //           onClick={() =>
  //             speciality === "Pediatrician"
  //               ? navigate("/doctor")
  //               : navigate("/doctor/Pediatrician")
  //           }
  //           className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer hover:translate-y-[-10px] transition-all duration-500 ${
  //             speciality === "Pediatrician" ? " bg-indigo-100 text-black" : ""
  //           }`}
  //         >
  //           Pediatricians
  //         </p>
  //         <p
  //           onClick={() =>
  //             speciality === "Neurologist"
  //               ? navigate("/doctor")
  //               : navigate("/doctor/Neurologist")
  //           }
  //           className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer hover:translate-y-[-10px] transition-all duration-500 ${
  //             speciality === "Neurologist" ? " bg-indigo-100 text-black" : ""
  //           }`}
  //         >
  //           Neurologist
  //         </p>
  //         <p
  //           onClick={() =>
  //             speciality === "Gastroenterologist"
  //               ? navigate("/doctor")
  //               : navigate("/doctor/Gastroenterologist")
  //           }
  //           className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer hover:translate-y-[-10px] transition-all duration-500 ${
  //             speciality === "Gastroenterologist"
  //               ? " bg-indigo-100 text-black"
  //               : ""
  //           }`}
  //         >
  //           Gastroenterologist
  //         </p>
  //       </div>
  //       <div
  //         className="w-full grid grid-cols-auto gap-4 gap-y-6 "
  //         style={{
  //           gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
  //         }}
  //       >
  //         {filterDoc.map((item, index) => (
  //           <div
  //             onClick={() => navigate(`/appointment/${item._id}`)}
  //             className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
  //             key={index}
  //           >
  //             <img
  //               // className="bg-blue-100 group-hover:bg-gray-600 transition-all duration-500"
  //               className="w-full h-[200px] object-cover bg-blue-100 group-hover:bg-gray-600 transition-all duration-500"
  //               src={item.image}
  //               alt={`Doctor ${item.name}`}
  //             />

  //             <div className="p-4">
  //               <div className="flex items-center gap-2 text-sm text-center text-green-500">
  //                 <p className="w-2 h-2 bg-green-500 rounded-full"></p>
  //                 <p>Available</p>
  //               </div>
  //               <p className="text-gray-900 text-lg font-medium ">
  //                 {item.name}
  //               </p>
  //               <p className="text-gray-600 text-sm">{item.speciality}</p>
  //             </div>
  //           </div>
  //         ))}
  //       </div>
  //     </div>
  //   </div>
  // );

  const { doctors, aToken, getAllDoctors, changeAvailability } =
    useContext(AdminAppContext);

  useEffect(() => {
    if (aToken) {
      getAllDoctors();
    }
  }, [aToken]);

  return (
    <div className="m-5 max-h-[90vh] overflow-y-scroll">
      <h1 className="text-lg font-medium">All Doctors</h1>
      <div className="w-full flex flex-wrap gap-4 pt-5 gap-y-6">
        {Array.isArray(doctors) && doctors.length > 0 ? (
          doctors.map((item, index) => (
            <div
              className="border border-indigo-200 rounded-xl max-w-56 overflow-hidden cursor-pointerr group "
              key={index}
            >
              <img
                className="bg-blue-100 group-hover:bg-gray-600 transition-all duration-500"
                src={item.image}
                alt={`Doctor ${item.name}`}
              />
              <div className="p-4">
                <p className="text-gray-900 text-lg font-medium ">
                  {item.name}
                </p>
                <p className="text-gray-600 text-sm">{item.speciality}</p>
                <div className="mt-2 flex items-center ggap-1 tet-sm">
                  <input
                    onChange={() => changeAvailability(item._id)}
                    type="checkbox"
                    checked={item.available}
                  />
                  <p className="p-2">Available</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No doctors available.</p>
        )}
      </div>
    </div>
  );
};

export default Doctors;
