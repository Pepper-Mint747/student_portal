import { compare, genSalt, hash } from "bcrypt";
import { sign } from "jsonwebtoken";
import { userModel } from "../models/user.model";

// validate email
// Todo: Handle email validation and verification efficiently
// const validateEmail = async (email) => {
//   if (/@students.kcau.ac.ke\s*$/.test(email) || /@kcau.ac.ke\s*$/.test(email)) {
//     let user = await userModel.findOne({ email });
//     return !!user;
//   } else {
//     return "not a valid school email";
//   }
// };

const validateEmail = async (email) => {
  let user = await userModel.findOne({ email });
  if (user) {
    return true;
  } else {
    return false;
  }
};

// Signup method
const signup = async (data, role, res) => {
  try {
    const userTaken = await validateEmail(data.email);
    if (userTaken) {
      return res.status(400).json({
        email: "Email is already taken",
        message: "Registration filure",
        success: false,
      });
    }
    const salt = await genSalt(15);
    const hashedPassword = await hash(data.password, salt);
    const code = crypto.randomInt(100000, 1000000);
    const newUser = new userModel({
      ...data,
      password: hashedPassword,
      verificationCode: code,
      role,
    });

    await newUser.save();
    return res.status(201).json({
      message: "Account successfully created",
      sucess: true,
    });
  } catch (err) {
    // Todo: Handle error appropriately
    return res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};

// Signin method
const signin = async (data, res) => {
  let { email, password } = data;
  
  if (!email || !password) {
      return response.status(400).json({ msg: 'All fields are required' });
    }
  
  const user = await userModel.findOne({ email });
  if (!user) {
    res.status(404).json({
      message: "Incorrect username or password",
      success: false,
    });
  }
  let isPasswordValid = await bcrypt.compare(password, user.password);
  if (isPasswordValid) {
    let token = sign({
      user_id: user._id,
      role: user.role,
      email: user.email,
      name: user.name,
    });
  }
};

// Forgot Password method
