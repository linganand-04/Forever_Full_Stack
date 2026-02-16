import { userModel } from "../models/userModel.js";
import validator from "validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const createToken = (id) => {
  console.log(id);
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

// Route for user login
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);

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
    console.error("Login error:", err);
    return res.status(500).json({
      success: false,
      message: "Login failed",
    });
  }
};

// Route for user register
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log("BODY:", req.body);

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

    res.send({ success: true, token });
  } catch (err) {
    console.log(err);
    res.send({ success: false, message: `${err.message}` });
  }
};

// Route for admin login
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // let adminEmail = process.env.ADMIN_EMAIL;
    // let adminPassword = process.env.ADMIN_PASSWORD;

    // // Request Verification
    // if (!email === process.env.ADMIN_EMAIL || !password)
    //   return res
    //     .status(400)
    //     .send({ success: false, message: "Fields are required.." });

    // // Email Verification
    // if (adminEmail !== email)
    //   return res.status(400).send({ success: false, message: "Unauthorized" });

    // // Password Verification
    // if (adminPassword !== password)
    //   return res
    //     .status(400)
    //     .send({ success: false, message: "Password Incorrect" });

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
    console.log(err.message);
  }
};

export { loginUser, registerUser, adminLogin };
