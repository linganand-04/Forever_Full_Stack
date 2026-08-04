import { userModel } from "../models/userModel.js";
import validator from "validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import crypto from "crypto";
import sendEmail from "../utils/sendEmail.js";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

//////////////////////////
// Route for user login //
//////////////////////////
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // console.log(req.body);

    // 1️⃣ Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // 2️⃣ Find user by email ONLY
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // 3️⃣ Compare password with hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // 4️⃣ Generate token
    const token = createToken(user._id);

    // 5️⃣ Send success response
    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Login failed",
    });
  }
};

//////////////////////////
// Route for user register
//////////////////////////
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // console.log("BODY:", req.body);

    // 1. Required fields check
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email and password are required",
      });
    }

    // 2. Email format validation
    if (!validator.isEmail(email)) {
      return res.status(400).json({
        message: "Please enter a valid email address",
      });
    }

    // 3. Password length validation
    if (password.length < 8 || password.length > 20) {
      return res.status(400).json({
        message: "Password must be 8–20 characters",
      });
    }

    // 4. Duplicate user check
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.status(408).json({
        success: false,
        message: "User already exists with this email",
      });
    }

    // Hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name,
      email,
      password: hashPassword,
    });

    const user = await newUser.save();
    const token = createToken(user._id);

    return res.send({
      success: true,
      message: "Register successful",
      token,
    });
  } catch (err) {
    return res.send({ success: false, message: `${err.message}` });
  }
};
///////////////////////////////
// Route For Forget Password //
///////////////////////////////

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({
        success: false,
        message: "No account found with this email.",
      });
    }

    // Generate token
    const resetToken = crypto.randomBytes(32).toString("hex");

    // console.log("RESET TOKEN:", resetToken);

    // Save hashed token
    user.resetPasswordToken = resetToken;

    user.resetPasswordExpire = Date.now() + 15 * 60 * 1000; // 15 min

    await user.save();

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/token=${resetToken}`;

    const html = `
      <h2>Password Reset</h2>

      <p>You requested to reset your password.</p>

      <a href="${resetUrl}">
        Reset Password
      </a>

      <p>This link expires in 15 minutes.</p>
    `;

    await sendEmail(user.email, "Password Reset", html);

    return res.json({
      success: true,
      message: "Password reset link sent.",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

////////////////////////////
// Route for Verify Token //
////////////////////////////
const verifyResetToken = async (req, res) => {
  try {
    const { token } = req.params;

    const user = await userModel.findOne({
      resetPasswordToken: token,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.json({
        success: false,
        message: "Invalid or expired reset link.",
      });
    }

    return res.json({
      success: true,
      message: "Token is valid.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
};

///////////////////////////////
// Route for Reset Password ///
///////////////////////////////
const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;

    const user = await userModel.findOne({
      resetPasswordToken: token,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.json({
        success: false,
        message: "Invalid or expired token.",
      });
    }

    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(req.body.password, salt);

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    return res.json({
      success: true,
      message: "Password reset successful.",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

//////////////////////////////////////
// Route for Resend Forgot Password //
//////////////////////////////////////
const resendForgotPassword = async (req, res) => {
  try {
    const { token } = req.params;

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Token is required.",
      });
    }

    // Find user even if token has expired
    const user = await userModel.findOne({
      resetPasswordToken: token,
    });

    if (!user) {
      return res.json({
        success: false,
        message: "Invalid reset token.",
      });
    }

    // Generate NEW token
    const newResetToken = crypto.randomBytes(32).toString("hex");

    // Replace old token
    user.resetPasswordToken = newResetToken;

    // New 15-minute expiry
    user.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

    await user.save();

    // Raw token goes in email
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/token=${newResetToken}`;

    const html = `
      <h2>Reset Your Password</h2>

      <p>You requested a new password reset link.</p>

      <a href="${resetUrl}">
        Reset Password
      </a>

      <p>This link expires in 15 minutes.</p>

      <p>
        If you didn't request this, you can ignore this email.
      </p>
    `;

    await sendEmail(user.email, "New Password Reset Link", html);

    return res.status(200).json({
      success: true,
      message: "A new reset link has been sent to your email.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to resend password reset email.",
    });
  }
};

///////////////////////////////
//// Route for admin login ////
///////////////////////////////
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Admin Login Success
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      // Generate token
      let token = jwt.sign(email + password, process.env.JWT_SECRET);
      return res.send({
        success: true,
        token: token,
        message: "Admin Login Successfull",
      });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export {
  loginUser,
  registerUser,
  adminLogin,
  resetPassword,
  verifyResetToken,
  forgotPassword,
  resendForgotPassword,
};
