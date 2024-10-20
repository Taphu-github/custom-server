
import { connectToMongoDB } from '../../../../lib/mongodb';
import device_owner from '@/models/device_owner';

export async function PUT(req, {params}) {
  connectToMongoDB();
  const id= params;
  try {
    device_owner.findById(id)
      .then(device_owner_ => {
        device_owner_.user_id = req.body.user_id;
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


export async function DELETE(req, {params}) {
  connectToMongoDB();
  const id= params;
  try {
    const deleteItem = device_owner.findByIdAndDelete(id);
    return Response.json({
      message: "Succesfully deleted"
    })
  } catch (error) {
    return Response.json({
      message: error
    })
  }
}


