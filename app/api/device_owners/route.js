import { connectToMongoDB } from "@/lib/mongodb";
import device_owner from "@/models/device_owner";
import user from "@/models/user";

export async function GET(){
    connectToMongoDB();
    try{
        const list=device_owner.find();
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
    connectToMongoDB();

    const user_id=req.body.user_id;
    const d_id=req.body.d_id;
    const date_of_own=req.body.date_of_own;
    console.log(req.body);
    try{
        const new_device_owner=await device_owner.create({
            user_id,
            d_id,
            date_of_own
        })

        new_device_owner.save();

        return Response.json({
            message: "Successfully added"
        })

    }catch(error){
        return Response.json({
            message: "error: "+error
        })
    }
}