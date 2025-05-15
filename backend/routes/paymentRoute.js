import express from "express";
import {
  createPaymentOrder,
  verifyPayment,
  refund,
} from "../controllers/paymentController.js";
import { authUser } from "../middlewares/authUser.js";

const paymentRouter = express.Router();

paymentRouter.post("/create-order", authUser, createPaymentOrder);

paymentRouter.post("/verify-payment", authUser, verifyPayment);

paymentRouter.post("/refund", authUser, refund);

export default paymentRouter;
