const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);
const bcrypt = require("bcryptjs");

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

export default FCMToken;


// module.exports = mongoose.models.FCMToken || mongoose.model("fcm_token", FCMToken);


