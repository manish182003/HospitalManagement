import cron from "node-cron";
import appointmentModel from "../modules/appointmentModel.js";
import moment from "moment-timezone";

export const updateAppointmentStatus = () => {
  cron.schedule("*/1 * * * *", async () => {
    console.log("Running Cron Job to Update Appointment Status...");

    try {
      const startOfTodayKolkata = moment.tz("Asia/Kolkata").startOf("day");
      const endOfTodayKolkata = moment.tz("Asia/Kolkata").endOf("day");

      const startOfTodayUTC = startOfTodayKolkata.clone().utc().toDate();
      const endOfTodayUTC = endOfTodayKolkata.clone().utc().toDate();

      console.log("Today Start (UTC):", startOfTodayUTC);
      console.log("Today End (UTC):", endOfTodayUTC);

      // Update to 'Completed' if before today's start
      await appointmentModel.updateMany(
        { date: { $lt: startOfTodayUTC } },
        { $set: { status: "Completed" } },
        { runValidators: true }
      );

      // Update to 'Ongoing' if within today (from midnight to 11:59:59 PM)
      await appointmentModel.updateMany(
        { date: { $gte: startOfTodayUTC, $lte: endOfTodayUTC } },
        { $set: { status: "Ongoing" } },
        { runValidators: true }
      );

      console.log("Appointment statuses updated successfully...");
    } catch (error) {
      console.error("Error updating appointment status:", error);
    }
  });
};
