import { connectToMongoDB } from "@/lib/mongodb";
import DeviceOwner from "@/models/device_owner";

export async function GET(){
    try{
        const list=DeviceOwner.find();
        return Response.json({
            message: list
        })
    }catch(error){
        return Response.json({
            message: error
        })
    }
}
