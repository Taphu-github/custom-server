const mongoose = require("mongoose");

const DeviceOwner = new mongoose.Schema({
  // _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  user_id: { type: Number, required: true },
  d_id: { type: String, required: true },
  date_of_own: { type: Date, required: false },
  remarks: { type: String, required: false, default: "No Remarks" },
});

module.exports =
  mongoose.models.DeviceOwner || mongoose.model("DeviceOwner", DeviceOwner);
