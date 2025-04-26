const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Device = new mongoose.Schema({
  d_id: { type: String, required: true, unique: true },
  d_name: { type: String, required: true },
  password: { type: String, required: true },
  location: { type: String, required: true },
  mac_address: { type: String, required: true, unique: true },
  installed_date: { type: Date, required: true },
  remarks: { type: String, required: false },
});

Device.pre("save", async function (next) {
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
Device.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

module.exports = mongoose.models.Device || mongoose.model("Device", Device);
