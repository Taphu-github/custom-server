import { connectToMongoDB } from '../../../lib/mongodb';
import User from '@/models/user';

export async function PUT(req){
    connectToMongoDB();
    try {
        User.findById(req.params.id)
            .then(user => {

                user.user_id = req.params.id;
                user.username = req.body.username;
                user.email = req.body.email;
                user.password = req.body.password;
                user.cid = req.body.cid;
                user.full_name = req.body.full_name;
                user.phone = req.body.phone;
                user.dzongkhag = req.body.dzongkhag;
                user.gewog = req.body.gewog;
                user.village = req.body.village;


                res.setHeader('Content-Type', 'application/json');

                user.save()
                    .then(() => res.json('user updated!'))
                    .catch(err => res.status(400).json('Error: ' + err));
            })
            .catch(err => res.status(400).json('Error: ' + err));

        res.status(200).json({ message: 'Device updated successfully!' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update device' });
    }
}


export async function DELETE(req){
    connectToMongoDB();
    try {
        const deleteItem = User.findByIdAndDelete(req.params.id);
        res.status(200).json('Device Deleted');
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete device' });
    }
}

