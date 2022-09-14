import { model, Schema } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required to create account"],
      unique: [true, "Account with this username already exists"],
    },
    email: {
      type: String,
      required: [true, "Email is required to create account"],
      unique: [true, "Account with this email already exists"],
    },
    image: {
      type: String,
      required: [true, "You need to add a profile picture"],
    },
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin"],
    },
    password: {
      type: String,
      required: [true, "Password is required to create account"],
      minLength: 6,
    },
    verificationCode: {
      type: Number,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    passwordResetCode: {
      type: String,
    },
  },
  { timestamps: true }
);

export const userModel = model("User", userSchema);
