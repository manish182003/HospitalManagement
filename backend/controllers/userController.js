import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../modules/userModel.js";
import mongoose from "mongoose";
import appointmentModel from "../modules/appointmentModel.js";
import userModel from "../modules/userModel.js";
import { createAppointment } from "../services/create-appointment.js";
import { v2 as cloudinary } from "cloudinary";

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" }); // 🔁 changed msg to message
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ name, email, password: hashedPassword });

    res
      .status(201)
      .json({ success: true, message: "Patient Register Successfully." });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" }); // 🔁 changed msg to message
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User is not yet registered.",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    return res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const bookAppointments = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const appointment = await createAppointment(req.body, session);
    await session.commitTransaction();
    session.endSession();
    return res.status(201).json({ success: true, appointment });
  } catch (e) {
    await session.abortTransaction();
    session.endSession();
    res.status(400).json({ success: false, error: e.message });
  }
};

export const getprofile = async (req, res) => {
  try {
    // const { userid } = req.user;
    const user = await User.findById(req.user).lean();
    console.table(user);
    res.status(201).json({ success: true, profile: user });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const updateprofile = async (req, res) => {
  try {
    const userId = req.user;
    const { name, email, address, gender, dob, phone } = req.body;

    // Validate input
    if (!name || !email) {
      return res
        .status(400)
        .json({ success: false, message: "Name and Email are required." });
    }

    // Check for duplicate email (if changing)
    const existingUser = await User.findOne({ email });
    if (existingUser && existingUser._id.toString() !== userId) {
      return res
        .status(409)
        .json({ success: false, message: "Email is already in use." });
    }

    let imageUrl;

    if (req.file) {
      const imageFile = req.file;
      const imageUpload = await cloudinary.uploader.upload(imageFile.path);
      imageUrl = imageUpload.secure_url;
    }

    const userAddress = JSON.parse(address);

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, email, imageUrl, userAddress, gender, dob, phone },
      { new: true } // return the updated doc
    ).select("-password"); // never send password

    res.status(201).json({ success: true, updatedUser });
  } catch (err) {
    console.error("Profile update error:", err);
    res
      .status(500)
      .json({ success: false, message: "Server error. Try again later." });
  }
};

export const getAppointments = async (req, res) => {
  try {
    const { patientId } = req.params;
    const { status, page = 1, limit = 10 } = req.query;

    // Check if the patientId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(patientId)) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid patientId format." });
    }

    const patient = await userModel.findById(patientId);

    if (!patient) {
      return res
        .status(404)
        .json({ success: false, error: "Patient Not Found!" });
    }

    if (!["Upcoming", "Ongoing", "Completed", "Cancelled"].includes(status)) {
      return res.status(400).json({ success: false, error: "Invalid status." });
    }

    const now = new Date();
    let today = new Date(now.getFullYear(), now.getMonth(), now.getDate()); // Remove time part
    // today.setDate(today.getDate() + 1);

    let matchCondition = {
      patientId: new mongoose.Types.ObjectId(patientId),
    };

    if (status === "Upcoming") {
      matchCondition.status = "Upcoming";
      matchCondition.date = { $gt: today };
    } else if (status === "Ongoing") {
      matchCondition.status = "Ongoing";
      matchCondition.date = today;
    } else if (status === "Completed") {
      matchCondition.status = "Completed";
      matchCondition.date = { $lt: today };
    } else if (status === "Cancelled") {
      matchCondition.status = "Cancelled";
    }

    const appointments = await appointmentModel
      .find(matchCondition)
      .populate("doctorId")
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .sort({ date: 1 });

    const total = await appointmentModel.countDocuments(matchCondition);

    return res.status(200).json({
      success: true,
      data: appointments,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
};
