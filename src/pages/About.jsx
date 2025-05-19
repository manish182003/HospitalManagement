import { assets } from "../assets/assets";
import Chatbot from "../components/Chatbot.jsx";

const About = () => {
  return (
    <div>
      <Chatbot />

      {/* About Us Title */}
      <div className="text-center text-3xl font-semibold pt-12 text-gray-700">
        <p>
          ABOUT 
        </p>
      </div>

      {/* Image and Description */}
      <div className="my-14 flex flex-col md:flex-row gap-12 px-6 md:px-20">
        <img
          className="w-full rounded-xl md:max-w-[400px] shadow-lg"
          src={assets.about_image}
          alt="Hospital Management"
        />
        <div className="flex flex-col justify-center gap-6 text-[16px] text-gray-600 md:w-2/3">
          <p>
            <strong>HSM</strong> is a state-of-the-art hospital
            management system designed to simplify the way healthcare works.
            From hassle-free appointment bookings to secure payments and
            real-time patient-doctor interactions — we bring everything under
            one smart platform.
          </p>
          <p>
            Our system enables patients to book appointments based on real-time
            availability and preferred dates. Integrated with{" "}
            <strong>Razorpay</strong>, we ensure seamless, secure, and instant
            payments with every booking.
          </p>
          <p>
            HMS features a robust three-panel system:{" "}
            <strong>Admin Panel</strong> to oversee operations,{" "}
            <strong>Doctor Panel</strong> for managing schedules and patient
            history, and a <strong>Patient Panel</strong> for easy appointment
            tracking, records, and interaction.
          </p>
          <b className="text-gray-800 text-lg">Our Mission</b>
          <p>
            We aim to revolutionize healthcare access through a digital-first
            approach — enabling smarter hospital workflows, empowering patients,
            and equipping doctors with powerful tools to deliver care
            efficiently.
          </p>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="text-center text-2xl text-gray-700 font-semibold my-10">
        WHY <span className="text-blue-600">CHOOSE US?</span>
      </div>

      <div className="flex flex-col md:flex-row gap-6 px-6 md:px-20 mb-20">
        <div className="border rounded-xl px-10 py-10 flex-1 bg-white shadow-md hover:bg-blue-50 transition">
          <h3 className="font-bold text-lg text-gray-800 mb-2">
            Intelligent Booking
          </h3>
          <p className="text-sm text-gray-600">
            Book appointments based on real-time availability with automatic
            conflict detection. Get notified instantly with reminders and
            updates.
          </p>
        </div>
        <div className="border rounded-xl px-10 py-10 flex-1 bg-white shadow-md hover:bg-blue-50 transition">
          <h3 className="font-bold text-lg text-gray-800 mb-2">
            Razorpay Integration
          </h3>
          <p className="text-sm text-gray-600">
            Secure and quick payments powered by Razorpay. Pay consultation fees
            seamlessly during booking — no hassle, no delay.
          </p>
        </div>
        <div className="border rounded-xl px-10 py-10 flex-1 bg-white shadow-md hover:bg-blue-50 transition">
          <h3 className="font-bold text-lg text-gray-800 mb-2">
            Three Panel Access
          </h3>
          <p className="text-sm text-gray-600">
            Dedicated dashboards for Admin, Doctor, and Patient with role-based
            authentication and powerful features tailored to each user.
          </p>
        </div>
      </div>

      {/* Authentication & Security Section */}
      <div className="bg-blue-50 py-10 px-6 md:px-20 rounded-t-xl">
        <div className="text-center text-2xl font-semibold text-gray-800 mb-6">
          Seamless Authentication & Role Management
        </div>
        <p className="text-center text-gray-600 max-w-3xl mx-auto text-sm">
          Our system ensures secure access through advanced authentication
          mechanisms. Each user—whether a doctor, patient, or admin—has a
          personalized experience after login, allowing them to manage
          appointments, records, payments, and more in real time.
        </p>
      </div>
    </div>
  );
};

export default About;
