import { connectToMongoDB } from "@/lib/mongodb";
import MQTT_cred from "@/models/MQTT_cred";


export async function PUT(req) {
  connectToMongoDB();
  try {
    MQTT_cred.findById(id)
      .then(mqtt_credit => {
        mqtt_credit.id = id;
        mqtt_credit.mqtt_id = req.body.mqtt_id;
        mqtt_credit.user_name = req.body.user_name;
        mqtt_credit.password = req.body.password;

        mqtt_credit.save();

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
    const deleteItem = MQTT_cred.findByIdAndDelete(req.params.id);
    return Response.json({
      message: 'Success'
    });
  } catch (error) {
    return Response.json({
      message: 'Failed to Fetch MQTT Cred'
    });
  }
}

