const { connectToMongoDB } = require('../../../lib/mongodb');
const MQTT_Cred = require("../../../models/MQTT_cred");


export async function GET() {
    connectToMongoDB();
    try {
        const credlist=MQTT_Cred.find();
        return Response.json({
            message: credlist
        })
    } catch (error) {
        return Response.json({
            message: 'Failed to Fetch MQTT Cred'
        })
    }
}

export async function POST(req){
    connectToMongoDB();
    try {
        const mqtt_id = req.body.mqtt_id;
        const user_name = req.body.user_name;
        const password = req.body.password;


        const mqtt_cred = new MQTT_Cred({
            mqtt_id,
            user_name,
            password
        })

        mqtt_cred.save();
        
        return Response.json({
            message: 'Succesfully Registered'
        });
        

    } catch (error) {
        return Response.json({
            message: error
        });
        
    }

}
