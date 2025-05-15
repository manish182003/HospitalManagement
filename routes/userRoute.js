import express from "express";
import {
  register,
  login,
  bookAppointments,
  getAppointments,
  getprofile,
  updateprofile,
} from "../controllers/userController.js";
import { checkSchema } from "express-validator";
import { runValidation } from "../validation/validation_run.js";
import { AppointmentSchema } from "../validation_schemas/appointment_schema.js";
import { authUser } from "../middlewares/authUser.js";
import {cancelAppointments} from "../controllers/doctorController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.post(
  "/bookAppointments",
  authUser,
  checkSchema(AppointmentSchema),
  runValidation,
  bookAppointments
);

router.post("/cancelAppointment", authUser, cancelAppointments);
router.post("/profile", authUser, getprofile);
router.post("/edit", authUser, updateprofile);
router.get("/getAppointments/:patientId", authUser, getAppointments);

export default router;
