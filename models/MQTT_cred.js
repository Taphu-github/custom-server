const mongoose= require("mongoose");

const MQTT_credit = new mongoose.Schema({
    mqtt_id: {type: String, required: true },
    user_name: { type: String, required: true },
    password: {type:String, required:true},
  
});

module.exports= mongoose.models.MQTT_credit || mongoose.model("MQTT_cred", MQTT_credit);