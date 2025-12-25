import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },

    phone: {
      type: String,
      required: true
    },

    dateOfBirth: {
      type: Date,
      required: true
    },

    placeOfBirth: {
      type: String,
      required: true,
      trim: true
    },

    password: {
      type: String,
      required: true
    },

    agreeToTerms: {
      type: Boolean,
      required: true,
      default: false
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user"
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("User", userSchema);
