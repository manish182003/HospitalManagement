import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <div className="md:mx-10">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        {/*--------------------Left Section---------------------- */}
        <div>
          <img className="mb-5 w-40" src={assets.logo} alt="logo" />
          <p className="text-xl font-medium mb-5">Specialties</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li className="cursor-pointer hover:text-black" onClick={() => navigate("/specialties/general-physician")}>General Physician</li>
            <li className="cursor-pointer hover:text-black" onClick={() => navigate("/specialties/gynecologist")}>Gynecologist</li>
            <li className="cursor-pointer hover:text-black" onClick={() => navigate("/specialties/dermatologist")}>Dermatologist</li>
            <li className="cursor-pointer hover:text-black" onClick={() => navigate("/specialties/pediatricians")}>Pediatricians</li>
            <li className="cursor-pointer hover:text-black" onClick={() => navigate("/specialties/neurologist")}>Neurologist</li>
            <li className="cursor-pointer hover:text-black" onClick={() => navigate("/specialties/gastroenterologist")}>Gastroenterologist</li>
          </ul>
        </div>

        {/*--------------------Center Section---------------------- */}
        <div>
          <p className="text-xl font-medium mb-5">Quicklinks</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li className="cursor-pointer hover:text-black" onClick={() => navigate("/")}>Home</li>
            <li className="cursor-pointer hover:text-black" onClick={() => navigate("/about")}>About Us</li>
            <li className="cursor-pointer hover:text-black" onClick={() => navigate("/contact")}>Contact Us</li>
            <li className="cursor-pointer hover:text-black" onClick={() => navigate("/login")}>Login/Signup</li>
          </ul>
        </div>

        {/*--------------------Right Section---------------------- */}
        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>+91-212-456-7890</li>
            <li>hmsproject001@gmail.com</li>
          </ul>
        </div>
      </div>

      {/*--------------------Copyright---------------------- */}
      <div>
        <hr />
        <p className="py-5 text-sm text-center">
          Copyright © {new Date().getFullYear()} Major Project - 
          Amrapali University (B.Tech - Final Year)
        </p>
      </div>
    </div>
  );
};

export default Footer;
