const mongoose= require("mongoose");

const DeviceOwner = new mongoose.Schema({
    user_id: {type: Number, required: true},
    d_id: { type: String, required: true },
    date_of_own: {type: Date, required: false}
  
});

module.exports = mongoose.models.DeviceOwner || mongoose.model("DeviceOwner", DeviceOwner);

