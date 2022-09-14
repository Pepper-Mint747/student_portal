import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model";

// validate email

const validateEmail = async (email) => {
  if (/@students.kcau.ac.ke\s*$/.test(email) || /@kcau.ac.ke\s*$/.test(email)) {
    let user = await User.findOne({ email });
    return !!user;
  } else {
    return "not a valid school email";
  }
};

// Signup method
const register = async (data, role, res) => {
  try {
    const userTaken = await validateEmail(data.email);
  } catch (err) {}
};

// Signin method

// Forgot Password method
