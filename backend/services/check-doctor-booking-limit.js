import appointmentModel from "../modules/appointmentModel.js";
import doctorModel from "../modules/doctorModel.js";

export const checkDoctorBookingLimit = async (doctorId, bookingDate) => {
  try {
    // Normalize the date to only compare year-month-day
    const startOfDay = new Date(bookingDate);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(bookingDate);
    endOfDay.setHours(23, 59, 59, 999);

    // Get the doctor's booking limit
    const doctor = await doctorModel.findById(doctorId);
    if (!doctor) {
      return {
        success: false,
        message: "Doctor Not Found.",
      };
    }

    const bookingLimit = doctor.bookingLimit || 10; // fallback if not defined

    // Find appointments on the same day for this doctor
    const appointmentsCount = await appointmentModel.countDocuments({
      doctorId,
      date: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
      status: { $ne: "Cancelled" },
    });

    // Compare with limit
    if (appointmentsCount >= bookingLimit) {
      return {
        success: false,
        message: "Booking limit reached for this doctor on selected date",
      };
    }

    return {
      success: true,
      message: "Booking allowed",
    };
  } catch (err) {
    console.error(err);
    return {
      success: false,
      message: "Server error",
    };
  }
};
