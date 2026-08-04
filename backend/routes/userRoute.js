import { Router } from "express";
import {
  loginUser,
  adminLogin,
  registerUser,
  forgotPassword,
  resetPassword,
  resendForgotPassword,
  verifyResetToken,
} from "../controllers/userController.js";

const userRouter = Router();
// http://localhost:4000/api/user/
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/admin", adminLogin);
userRouter.post("/forgot-password", forgotPassword);
userRouter.post("/reset-password/:token", resetPassword);

userRouter.get("/verify-reset-token/:token", verifyResetToken);

userRouter.get("/resend-forgot-password/:token", resendForgotPassword);
export default userRouter;
