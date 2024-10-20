import { connectToMongoDB } from "@/lib/mongodb";
import Device from "@/models/device";

export async function GET(){
    try{
        const list=Device.find();
        return Response.json({
            message: list
        })
    }catch(error){
        return Response.json({
            message: error
        })
    }
}

export async function POST(req){
    try {
        const d_id = req.body.d_id;
        const d_name = req.body.d_name;
        const password = req.body.password;
        const location = req.body.location;
        const mac_address = req.body.mac_address;

        const systemowner = new Device({
            d_id,
            d_name,
            password,
            location,
            mac_address
        })
        systemowner.save();
        return Response.json({
            message: "Successfully Added"
        })
        
    } catch (error) {
        return Response.json({
            message: error
        })
    }
}