const mongoose= require("mongoose");


const User = new mongoose.Schema({
    user_id:{
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        
      },
      email: {
        type: String,
        required: true,
        unique: true
      },
      password: {
        type: String, 
        required: true
      },
      cid: {
        type: String, 
        required: true,
        unique: true
      },
      full_name: {
        type: String, 
        required: true
      },
      phone: {
        type: String, 
        required: true,
        unique: true
      },
      dzongkhag: {
        type: String, 
        required: true
      },
      gewog: {
        type: String, 
        required: true
      },
      village: {
        type: String, 
        required: true
      }, 
},
{
    timestamps: true,
});


module.exports= mongoose.models.User || mongoose.model("User", User);


