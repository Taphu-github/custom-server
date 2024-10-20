import { connectToMongoDB } from '@/lib/mongodb';
import user from '@/models/user';

export async function PUT(req, { params }){
    connectToMongoDB();
    const { id } = params;
    try {
        user.findById(id)
            .then(u => {

                u.user_id = req.body.user_id;
                u.username = req.body.username;
                u.email = req.body.email;
                u.password = req.body.password;
                u.cid = req.body.cid;
                u.full_name = req.body.full_name;
                u.phone = req.body.phone;
                u.dzongkhag = req.body.dzongkhag;
                u.gewog = req.body.gewog;
                u.village = req.body.village;

                u.save();

            });
        return Response.json({
            message: "Updated"
        })
            

    } catch (error) {
        return Response.json({
            message: error
        })
    }
}


export async function DELETE(req, {params}){
    connectToMongoDB();
    const { id } = params;
    try {
        
        await user.findByIdAndDelete(id);
        
        return Response.json({
            message: "deleted succesfully"
        })
    } catch (error) {
        return Response.json({
            message: "error"+error
        })
    }
}
