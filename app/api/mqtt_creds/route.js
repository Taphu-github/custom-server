const { connectToMongoDB } = require('../../../lib/mongodb');
const MQTT_Cred = require("../../../models/MQTT_cred");

/**
 * @swagger
 * /api/mqtt-creds:
 *   get:
 *     summary: Get list of MQTT credentials
 *     description: Retrieves all MQTT credentials from the database.
 *     responses:
 *       200:
 *         description: List of MQTT credentials
 *       400:
 *         description: Failed to fetch MQTT credentials
 */

/**
 * @swagger
 * /api/mqtt-creds:
 *   post:
 *     summary: Register new MQTT credentials
 *     description: Registers new MQTT credentials in the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example:
 *               mqtt_id: "string"
 *               user_name: "string"
 *               password: "string"
 *     responses:
 *       200:
 *         description: Successfully registered MQTT credentials
 *       400:
 *         description: Failed to register MQTT credentials
 */

export async function GET() {
    connectToMongoDB();
    try {
        const credlist=MQTT_Cred.find();
        return Response.json({
            data: credlist
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
            mqtt_cred,
            message: 'Succesfully Registered'
        },{
            status: 200
        });
        

    } catch (error) {
        return Response.json({
            message: error
        });
        
    }

}
