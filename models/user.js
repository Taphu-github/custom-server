const { unix } = require("moment");
const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);
const bcrypt = require("bcryptjs");

const User = new mongoose.Schema(
  {
    user_id: {
      type: Number,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    cid: {
      type: String,
      required: true,
      unique: true,
    },
    full_name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    dzongkhag: {
      type: String,
      required: true,
    },
    gewog: {
      type: String,
      required: true,
    },
    village: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "user",
    },
    remarks: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

User.plugin(AutoIncrement, { inc_field: "user_id" });

User.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, salt);
    next();
  } catch (error) {
    return next(error);
  }
});

// Compare the given password with the hashed password in the database
User.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

module.exports = mongoose.models.User || mongoose.model("User", User);
