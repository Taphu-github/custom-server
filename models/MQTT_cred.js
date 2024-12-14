const mongoose= require("mongoose");

const MQTT_cred = mongoose.models.MQTT_cred || mongoose.model('MQTT_cred', new mongoose.Schema({

// const MQTT_credSchema = new mongoose.Schema({
    mqtt_id: {type: String, required: true },
    user_name: { type: String, required: true },
    password: {type:String, required:true},
  
}));


// const MQTT_cred=mongoose.models.MQTT_credit || mongoose.model("MQTT_cred", MQTT_credSchema);
module.exports= MQTT_cred;