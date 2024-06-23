const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    name: String,
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true, select: false },
    roles: {
      type: [String],
      enum: ["admin", "user"],
      default: "user",
      required: true,
    },
    pictureUrl: { type: String },
    isActive: { type: Boolean, default: true, required: true },
    token: { type: String }, // fp token
  },
  { timestamps: true }
);

module.exports = new model("User", userSchema);
