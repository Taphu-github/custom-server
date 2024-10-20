import { connectToMongoDB } from "@/lib/mongodb";
import user from "@/models/user";
import device_owner from "@/models/device_owner";
import user from "@/models/user";

export async function POST(req) {

    connectToMongoDB();

    const {username, password} = req.body;
    let user_id=""

    const user = (await user.findOne({username: username})) || (await user.findOne({phone: username}));
    uid=user.user_id;

    if(!user){
        return Response.json({
            message: "User not found"
        })
    }

    const passwordMatch = await user.comparePassword(password);
    if(!password){
        return Response.json({
            message: "Incorrect Password"
        })
    }

    const token = jwt.sign({userId: user._id}, process.env.SECRET_KEY, {
        expiresIn: '1 hour'
      });

    
    let devices= device_owner.find({user_id: uid});
    let device_arr= []

    devices.map(device=>{
        device_arr.push(device.d_id)
    })

    console.log(device_arr);

    return Response.json({
        "token":token,
        "topics": device_arr

    })


    
}
