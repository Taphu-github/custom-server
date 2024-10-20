const mongoose= require("mongoose");

const Device = new mongoose.Schema<DeviceDocument>({
    d_id: { type: String, required: true },
    d_name: { type: String, required: true },
    password: {type:String, required:true},
    location: { type: String, required: true },
    mac_address: { type: String, required: true },
    installed_date: {type:  Date, required: true}
});

module.exports= mongoose.models?.Device || mongoose.model("Device", Device);
