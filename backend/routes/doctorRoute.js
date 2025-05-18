import express from "express";
import {
  getDoctorAppointments,
  doctorDashboard,
  doctorLogin,
  getDoctorById,
  getTopDoctors,
  getAllDoctors,
  getRelatedDoctors,
  getDoctorsBySpeciality,
  // assignNurseToPatient
} from "../controllers/doctorController.js";
import authDoctor from "../middlewares/authDoctor.js"; // Auth middleware

const router = express.Router();

// 🔐 Login
router.post("/login", doctorLogin);

router.get("/all/doc", getAllDoctors);

// View Appointments
router.get("/appointments/:doctorId", authDoctor, getDoctorAppointments);

// 🆕 Get doctor by ID
router.get("/doc/:id", authDoctor, getDoctorById);

// 🆕 Get top doctors
router.get("/top/doctors", authDoctor, getTopDoctors);

// 🆕 Get related doctors by speciality
router.get("/related/:speciality", authDoctor, getRelatedDoctors);

// Important Tip:
// If speciality names might have spaces (e.g., "Heart Surgeon"), you should encode it in URL like
//  Heart%20Surgeon or accept it in the body (POST method).

// 🆕 Get doctors by speciality
router.get("/speciality/:speciality", authDoctor, getDoctorsBySpeciality);
//narendra=========================================================================
router.get("/dashboard", authDoctor, doctorDashboard);

// ========================Doctor dashboard=============================

router.get("/profile", authDoctor, getDoctorProfile);
router.get("/appointments", authDoctor, getDoctorAppointments);

export default router;

