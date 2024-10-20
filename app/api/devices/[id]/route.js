import { connectToMongoDB } from "@/lib/mongodb";
import Device from "@/models/device";


export async function PUT(req, {params}) {
    const id= params;
    connectToMongoDB();
    try {
        Device.findById(id)
        .then(device => {
            device.d_id = req.body.d_id;
            device.d_name = req.body.d_name;
            device.password = req.body.password;
            device.location = req.body.location;
            device.mac_address = req.body.mac_address;
            device.save();
  
        })
      return Response.json({
        message: 'Success'
      });
    } catch (error) {
      return Response.json({
        message: 'Failed to Fetch MQTT Cred'
      });
    }
  }
  
  
  export async function DELETE(req) {
    connectToMongoDB();
    try {
        const deleteItem = Device.findByIdAndDelete(req.params.id);
        return Response.json({
        message: 'Success'
      });
    } catch (error) {
      return Response.json({
        message: 'Failed to Fetch MQTT Cred'
      });
    }
  }
  
  