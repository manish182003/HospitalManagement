import { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { AdminAppContext } from "../../context/AdminAppContext";
import { toast } from "react-toastify";
import axios from "axios";

const AddDoctor = () => {
  const [docImg, setDocImg] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [experience, setExperience] = useState("1 Year");
  const [fees, setFees] = useState("");
  const [about, setAbout] = useState("");
  const [speciality, setSpeciality] = useState("physician");
  const [degree, setDegre] = useState("");
  const [address, setAddress] = useState("");

  const [slots, setSlots] = useState([]);
  const [slotDay, setSlotDay] = useState("Monday");

  const { aToken, backendUrl } = useContext(AdminAppContext);

  const addSlot = () => {
    if (!slotDay) {
      return toast.error("Please select a day.");
    }
    const newSlot = { day: slotDay };
    setSlots([...slots, newSlot]);
  };

  const removeSlot = (index) => {
    setSlots(slots.filter((_, i) => i !== index));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (!docImg) {
        return toast.error("Image not selected");
      }

      const formData = new FormData();
      formData.append("image", docImg);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("experience", experience);
      formData.append("fees", Number(fees));
      formData.append("about", about);
      formData.append("speciality", speciality);
      formData.append("degree", degree);
      formData.append("address", JSON.stringify({ line1: address }));
      formData.append("slots", JSON.stringify(slots));

      const { data } = await axios.post(
        backendUrl + "api/admin/add-doctor",
        formData,
        { headers: { aToken } }
      );
      if (data.success) {
        toast.success(data.message);
        setDocImg(false);
        setName("");
        setPassword("");
        setEmail("");
        setAddress("");
        setDegre("");
        setAbout("");
        setFees("");
        setExperience("1 Year");
        setSlots([]);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong.");
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="m-5 w-full">
      <p className="mb-3 text-lg font-medium">Add Doctor</p>
      <div className="bg-white px-8 py-8 border rounded w-full max-w-7xl max-h-[90vh] overflow-y-scroll">
        <div className="flex items-center gap-4 mb-8 text-gray-500">
          <label htmlFor="doc-img">
            <img
              className="w-16 bg-gray-100 rounded-full cursor-pointer"
              src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
              alt=""
            />
          </label>
          <input
            onChange={(e) => setDocImg(e.target.files[0])}
            type="file"
            id="doc-img"
            hidden
          />
          <p>
            upload doctor <br /> picture
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-start gap-10 text-gray-600">
          <div className="w-full lg:flex-1 flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <p>Doctor name</p>
              <input onChange={(e) => setName(e.target.value)} value={name} className="border rounded px-3 py-2" type="text" placeholder="Name" required />
            </div>
            <div className="flex flex-col gap-1">
              <p>Doctor Email</p>
              <input onChange={(e) => setEmail(e.target.value)} value={email} className="border rounded px-3 py-2" type="email" placeholder="Email" required />
            </div>
            <div className="flex flex-col gap-1">
              <p>Doctor Password</p>
              <input onChange={(e) => setPassword(e.target.value)} value={password} className="border rounded px-3 py-2" type="password" placeholder="password" required />
            </div>
            <div className="flex flex-col gap-1">
              <p>Experience</p>
              <select onChange={(e) => setExperience(e.target.value)} value={experience} className="border rounded px-3 py-2">
                {[...Array(10).keys()].map((i) => (
                  <option key={i} value={`${i + 1} Year`}>{`${i + 1} Year`}</option>
                ))}
                <option value="10+ Year">10+ Year</option>
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <p>Fees</p>
              <input onChange={(e) => setFees(e.target.value)} value={fees} className="border rounded px-3 py-2" type="number" placeholder="fees" required />
            </div>
          </div>

          <div className="w-full lg:flex-1 flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <p>Speciality</p>
              <select onChange={(e) => setSpeciality(e.target.value)} value={speciality} className="border rounded px-3 py-2">
                <option value="Physician">Physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatricians">Pediatricians</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <p>Education</p>
              <input onChange={(e) => setDegre(e.target.value)} value={degree} className="border rounded px-3 py-2" type="text" placeholder="Education" required />
            </div>
            <div className="flex flex-col gap-1">
              <p>Address</p>
              <input onChange={(e) => setAddress(e.target.value)} value={address} className="border rounded px-3 py-2" type="text" placeholder="Address" required />
            </div>
          </div>
        </div>

        <div>
          <p className="mt-4 mb-2">About Doctor</p>
          <textarea onChange={(e) => setAbout(e.target.value)} value={about} className="w-full px-4 pt-2 border rounded" type="text" placeholder="write about doctor" rows={5} required />
        </div>

        <div className="mt-6">
          <p className="mb-2 font-semibold">Add Available Slots</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <select value={slotDay} onChange={(e) => setSlotDay(e.target.value)} className="border rounded px-3 py-2">
              {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(day => (
                <option key={day} value={day}>{day}</option>
              ))}
            </select>
            <button type="button" onClick={addSlot} className="bg-blue-500 text-white px-4 py-2 rounded">Add Slot</button>
          </div>

          {slots.length > 0 && (
            <div className="mt-4">
              <p className="font-medium mb-2">Current Slots:</p>
              <ul className="list-disc ml-5 space-y-1">
                {slots.map((slot, index) => (
                  <li key={index} className="flex justify-between items-center">
                    {slot.day}
                    <button type="button" onClick={() => removeSlot(index)} className="ml-4 text-red-500">Remove</button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <button type="submit" className="bg-gray-300 px-10 py-5 mt-6 rounded-full">
          Add Doctor
        </button>
      </div>
    </form>
  );
};

export default AddDoctor;
