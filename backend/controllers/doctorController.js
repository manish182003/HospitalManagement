import doctorModel from "../modules/doctorModel.js";
import appointmentModel from "../modules/appointmentModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// 🩺 View Scheduled Appointments
const getDoctorAppointments = async (req, res) => {
  try {
    const { docId } = req.body;
    const appointments = await appointmentModel.find({ docId });

    res.json({ success: true, appointments });
  } catch (error) {
    onsole.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// 🧑‍⚕️ Doctor Login
const doctorLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const doctor = await doctorModel.findOne({ email });

    if (!doctor) {
      return res
        .status(401)
        .json({ success: false, message: "Doctor is Not Yet Registered." });
    }

    const isMatch = await bcrypt.compare(password, doctor.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      doctor: {
        id: doctor._id,
        name: doctor.name,
        email: doctor.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ---------------------GetDoctorsById----------------------
const getDoctorById = async (req, res) => {
  try {
    const doctorId = req.params.id;
    const doctor = await doctorModel.findById(doctorId);

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    res.status(200).json(doctor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch doctor" });
  }
};

// 🆕 Get top doctors based on experience
const getTopDoctors = async (req, res) => {
  try {
    const topDoctors = await doctorModel
      .find()
      .sort({ experience: -1 }) // Sort by experience in descending order
      .limit(8); // Limit to top 20 doctors

    res.status(200).json(topDoctors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch top doctors" });
  }
};

// 🆕 Get 2 related doctors based on speciality and highest experience
const getRelatedDoctors = async (req, res) => {
  try {
    const { speciality } = req.params;

    const relatedDoctors = await doctorModel
      .find({ speciality })
      .sort({ experience: -1 }) // Sort by experience (highest first)
      .limit(2); // Only 2 doctors

    res.status(200).json(relatedDoctors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch related doctors" });
  }
};

// 🆕 Get doctors by speciality
const getDoctorsBySpeciality = async (req, res) => {
  try {
    const { speciality } = req.params;

    const doctors = await doctorModel.find({ speciality });

    res.status(200).json(doctors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch doctors by speciality" });
  }
};

// -----------------------cancle appoinments by id -----------------------

const cancelAppointments = async (req, res) => {
  const { appointmentId } = req.body;

  if (!appointmentId) {
    return res.status(400).json({
      success: false,
      message: "Appointment ID is required",
    });
  }

  try {
    const appointment = await appointmentModel.findByIdAndDelete(appointmentId);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Appointment cancelled successfully",
    });
  } catch (error) {
    console.error("Error cancelling appointment:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error while cancelling appointment",
    });
  }
};

// ======================get all doctors==========================
const getAllDoctors = async (req, res) => {
  try {
    const doctors = await doctorModel.find().populate("available_slots"); // Fetch all doctors

    res.status(200).json({ success: true, data: doctors });
  } catch (error) {
    console.error(error);

    res
      .status(500)
      .json({ success: false, message: "Failed to fetch doctors" });
  }
};
const doctorDashboard = async (req, res) => {
  try {
    const { docId } = req.body;
    const appointments = await appointmentModel.find({ docId });
    let earnings = 0;

    appointments.map((item) => {
      if (item.isCompleted || item.payment) {
        earnings += item.amount;
      }
    });
    let patients = [];
    appointments.map((item) => {
      if (!patients.includes(item.userId)) {
        patients.push(item.userId);
      }
    });

    const dashData = {
      appointments: appointments.length,
      earnings,
      patients: patients.length,
      latestAppointments: appointments.reverse().slice(0, 5),
    };
    return res.json({ success: true, dashData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const doctorProfile = async (req, res) => {
  try {
    const { docId } = req.body;
    const profileData = await doctorModel.findById(docId).select("-password");
    res.json({ success: true, profileData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const changeAvailablity = async (req, res) => {
  try {
    const { docId } = req.body;

    const docData = await doctorModel.findById(docId);
    await doctorModel.findByIdAndUpdate(docId, {
      available: !docData.available,
    });
    res.json({ success: true, message: "Availabity changed" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export {
  getDoctorAppointments,
  doctorDashboard,
  doctorLogin,
  cancelAppointments,
  getDoctorsBySpeciality,
  getDoctorById,
  getRelatedDoctors,
  getTopDoctors,
  getAllDoctors,
  doctorProfile,
  changeAvailablity
};
