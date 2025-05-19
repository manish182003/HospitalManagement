import cron from "node-cron";
import appointmentModel from "../modules/appointmentModel.js";
import moment from "moment-timezone";

export const updateAppointmentStatus = () => {
  cron.schedule("*/1 * * * *", async () => {
    console.log("Running Cron Job to Update Appointment Status...");

    try {
      // Get today's start and end time in Asia/Kolkata, converted to UTC
      const todayStartUTC = moment.tz("Asia/Kolkata").startOf("day").utc();
      const todayEndUTC = moment.tz("Asia/Kolkata").endOf("day").utc();

      console.log("Today Start (UTC):", todayStartUTC.toDate());
      console.log("Today End (UTC):", todayEndUTC.toDate());

      // Step 1: Mark all appointments before today as Completed
      await appointmentModel.updateMany(
        { date: { $lt: todayStartUTC.toDate() } },
        { $set: { status: "Completed" } }
      );

      // Step 2: Mark all appointments today as Ongoing
      await appointmentModel.updateMany(
        {
          date: {
            $gte: todayStartUTC.toDate(),
            $lte: todayEndUTC.toDate(),
          },
        },
        { $set: { status: "Ongoing" } }
      );

      console.log("Appointment statuses updated successfully...");
    } catch (error) {
      console.error("Error updating appointment statuses:", error);
    }
  });
};
