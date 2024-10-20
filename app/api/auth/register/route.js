import { connectToMongoDB } from '../../../../lib/mongodb';
import user from '@/models/user';

export async function POST(req) {
    connectToMongoDB();
    const body=await req.json();
    const user_id = body["user_id"];
    const username = body["username"];
    const email = body["email"];
    const password = body["password"];
    const cid = body["cid"];
    const full_name = body["full_name"];
    const phone = body['phone'];
    const dzongkhag = body['dzongkhag'];
    const gewog = body['gewog'];
    const village = body['village'];
    
    try {
        // Creating a new todo using Todo model
        const newUser = await user.create({
            user_id,
            username,
            email,
            password,
            cid,
            full_name,
            phone,
            dzongkhag,
            gewog,
            village
        });
        // Saving the new todo
        newUser.save();
        return Response.json({
            message: 'Succesfully Registered'
        })
    }catch(error){
        return Response.json({
            message: 'Error'
        })
    }
}