import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

const TopDoctor = () => {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  return (
    <div className="overflow-x-hidden flex justify-start py-10 px-10">
      <div className="w-full max-w-5xl border rounded-xl p-6 bg-white shadow-md ml-20">
        <h1 className="text-2xl font-semibold mb-6 text-center text-gray-900">
          Doctor List
        </h1>
        <div
          className="grid gap-6"
          style={{ gridTemplateColumns: "repeat(3, 1fr)" }}
        >
          {doctors.map((item, index) => (
            <div
              key={index}
              // onClick={() => navigate(`/appointment/${item._id}`)}
              className="border border-blue-200 rounded-lg overflow-hidden cursor-pointer hover:translate-y-[-6px] transition-transform duration-300"
            >
              <img
                className="w-full h-40 object-cover bg-blue-50"
                src={item.image}
                alt={item.name}
              />
              <div className="p-3">
                <div className="flex items-center gap-2 text-xs text-green-500 mb-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full inline-block"></span>
                  <span>Available</span>
                </div>
                <p className="text-gray-900 text-md font-medium">{item.name}</p>
                <p className="text-gray-600 text-xs">{item.speciality}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopDoctor;
