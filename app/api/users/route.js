import { connectToMongoDB } from '../../../lib/mongodb';
import user from '@/models/user';

export async function GET() {
    connectToMongoDB();
    try {
        const userlist=(await user.find());
        console.log(userlist);
        return Response.json({
            message: userlist
        })
    } catch (error) {
        return Response.json({
            message: "error: "+error
        })
    }
}

