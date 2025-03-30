
const mongoose = require("mongoose");

const FCMTokenSchema = new mongoose.Schema({
    user_id: {
        type: Number,
        unique: true
    },
    fcm_token: {
        type: String,
        required: true,
        unique: true

    }

});

const FCMToken =
  mongoose.models.FCMToken || mongoose.model("FCMToken", FCMTokenSchema);

module.exports = FCMToken;



