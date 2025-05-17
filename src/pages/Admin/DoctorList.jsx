import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { AdminAppContext } from "../../context/AdminAppContext";

// const TopDoctor = () => {
//   const navigate = useNavigate();
//   const { doctors } = useContext(AppContext);

//   return (
//     <div className="overflow-x-hidden flex justify-start py-10 px-10">
//       <div className="w-full max-w-5xl border rounded-xl p-6 bg-white shadow-md ml-20">
//         <h1 className="text-2xl font-semibold mb-6 text-center text-gray-900">
//           Doctor List
//         </h1>
//         <div
//           className="grid gap-6"
//           style={{ gridTemplateColumns: "repeat(3, 1fr)" }}
//         >
//           {doctors.map((item, index) => (
//             <div
//               key={index}
//               // onClick={() => navigate(`/appointment/${item._id}`)}
//               className="border border-blue-200 rounded-lg overflow-hidden cursor-pointer hover:translate-y-[-6px] transition-transform duration-300"
//             >
//               <img
//                 className="w-full h-40 object-cover bg-blue-50"
//                 src={item.image}
//                 alt={item.name}
//               />
//               <div className="p-3">
//                 <div className="flex items-center gap-2 text-xs text-green-500 mb-1">
//                   <span className="w-2 h-2 bg-green-500 rounded-full inline-block"></span>
//                   <span>Available</span>
//                 </div>
//                 <p className="text-gray-900 text-md font-medium">{item.name}</p>
//                 <p className="text-gray-600 text-xs">{item.speciality}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };
const DoctorList = () => {
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

export default DoctorList;
