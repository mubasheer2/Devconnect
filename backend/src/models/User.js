import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    gender: {
  type: String,
  enum: ["male", "female", "other", ""],
  default: "",
},
    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    // 👇 onboarding me fill hoga
    domain: {
      type: String,
      default: "",
    },

    primaryTech: {
      type: String,
      default: "",
    },

    bio: {
      type: String,
      default: "",
    },

    profilePic: {
      type: String,
      default: "",
    },

    location: {
      type: String,
      default: "",
    },

    isOnboarded: {
      type: Boolean,
      default: false,
    },

    friends: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

// hash password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model("User", userSchema);