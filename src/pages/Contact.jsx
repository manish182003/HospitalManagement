import { assets } from "../assets/assets";
import Chatbot from "../components/Chatbot.jsx";

const Contact = () => {
  return (
    <div>
      <Chatbot />
      <div className="text-center text-3xl pt-10 font-semibold text-gray-700">
        <p>
          Get in <span className="text-blue-500">Touch</span>
        </p>
        <p className="text-sm mt-2 text-gray-500">
          {`We're here to help with appointments, support, and more.`}
        </p>
      </div>

      <div className="my-12 flex flex-col md:flex-row justify-center items-center gap-12 px-4 md:px-20">
        <img
          className="w-full md:w-[400px] rounded-2xl shadow-lg"
          src={assets.contact_image}
          alt="Contact Illustration"
        />

        <div className="flex flex-col gap-6 text-gray-600 text-sm md:text-base w-full md:w-2/3">
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-1">
              🏥 Our Main Office
            </h3>
            <p>
              HMS-Hospital Management System <br />
              Amrapali, Lamachaur <br />
              Haldwani, Uttarakhand, India
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-1">
              📞 Contact Support
            </h3>
            <p>
              Phone: +91 98765 43210 <br />
              Email: hmsProject001@gmail.com
            </p>
            <p className="mt-2">
              For urgent queries or booking issues via Razorpay, our team is
              available 24/7 to assist.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-1">
              💼 Careers at CLINIX-XYZ
            </h3>
            <p>
              We’re building India’s best healthcare platform with dedicated
              panels for Admins, Doctors & Patients. Join our mission to make
              booking appointments seamless and smart.
            </p>
            <button className="mt-4 border border-blue-500 text-blue-500 px-6 py-2 rounded-lg hover:bg-blue-500 hover:text-white transition duration-300">
              Explore Careers
            </button>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-1">
              📘 Follow Us
            </h3>
            <p className="text-gray-500">
              Stay connected through our social channels for updates and health
              tips.
            </p>
            <div className="flex gap-4 mt-2 text-xl">
              <a href="#" className="hover:text-blue-600">
                🌐
              </a>
              <a href="#" className="hover:text-blue-600">
                📘
              </a>
              <a href="#" className="hover:text-blue-600">
                📸
              </a>
              <a href="#" className="hover:text-blue-600">
                🐦
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
