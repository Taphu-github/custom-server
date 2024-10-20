
import { connectToMongoDB } from '../../../../lib/mongodb';
import device_owner from '@/models/device_owner';

export async function PUT(req) {
  connectToMongoDB();
  try {
    device_owner.findById(id)
      .then(device_owner_ => {
        device_owner_.id = id,
        device_owner_.user_id = body.user_id;
        device_owner_.d_id = req.body.d_id;
        device_owner_.date = req.body.password;

        device_owner_.save()
      })
    return Response.json({
      message: "Succesfully updated device owner"
    })
  } catch (error) {
    return Response.json({
      message: error
    })
  }
}


export async function DELETE(req) {
  connectToMongoDB();
  try {
    const deleteItem = device_owner.findByIdAndDelete(req.params.id);
    return Response.json({
      message: "Succesfully deleted"
    })
  } catch (error) {
    return Response.json({
      message: error
    })
  }
}


