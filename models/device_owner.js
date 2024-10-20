const mongoose= require("mongoose");

const DeviceOwner = new mongoose.Schema<DeviceOwnerDocument>({
    user_id: {type: String, required: true},
    d_id: { type: String, required: true },
    date_of_own: {type: Date, required: true}
  
});

module.exports = mongoose.models.DeviceOwner || mongoose.model("DeviceOwner", DeviceOwner);

