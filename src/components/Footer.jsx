import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-100 px-6 md:px-10 pt-16 pb-8 mt-40 text-sm text-gray-700">
      {/* Top Footer */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-14">
        {/*--------------------Left Section---------------------- */}
        <div className="flex flex-col items-start">
          <img className="mb-4 w-36" src={assets.logo} alt="logo" />
          <p className="text-xl font-semibold mb-4">Specialties</p>
          <ul className="flex flex-col gap-2">
            <li className="cursor-pointer hover:text-black transition" onClick={() => navigate("/doctor/Physician")}>General Physician</li>
            <li className="cursor-pointer hover:text-black transition" onClick={() => navigate("/doctor/Gynecologist")}>Gynecologist</li>
            <li className="cursor-pointer hover:text-black transition" onClick={() => navigate("/doctor/Dermatologist")}>Dermatologist</li>
            <li className="cursor-pointer hover:text-black transition" onClick={() => navigate("/doctor/Pediatrician")}>Pediatricians</li>
            <li className="cursor-pointer hover:text-black transition" onClick={() => navigate("/doctor/Neurologist")}>Neurologist</li>
            <li className="cursor-pointer hover:text-black transition" onClick={() => navigate("/doctor/Gastroenterologist")}>Gastroenterologist</li>
          </ul>
        </div>

        {/*--------------------Center Section---------------------- */}
        <div>
          <p className="text-xl font-semibold mb-4">Quick Links</p>
          <ul className="flex flex-col gap-2">
            <li className="cursor-pointer hover:text-black transition" onClick={() => navigate("/")}>Home</li>
            <li className="cursor-pointer hover:text-black transition" onClick={() => navigate("/about")}>About Us</li>
            <li className="cursor-pointer hover:text-black transition" onClick={() => navigate("/contact")}>Contact Us</li>
            <li className="cursor-pointer hover:text-black transition" onClick={() => navigate("/login")}>Login/Signup</li>
          </ul>
        </div>

        {/*--------------------Right Section---------------------- */}
        <div>
          <p className="text-xl font-semibold mb-4">Get In Touch</p>
          <ul className="flex flex-col gap-2">
            <li>📞 +91-212-456-7890</li>
            <li>📧 hmsproject001@gmail.com</li>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div className="mt-10">
        <hr className="border-gray-300" />
        <p className="py-4 text-center text-gray-600 text-xs">
          © {new Date().getFullYear()} Major Project — Amrapali University (B.Tech Final Year)
        </p>
      </div>
    </div>
  );
};

export default Footer;
