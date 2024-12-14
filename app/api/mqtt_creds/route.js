// const { connectToMongoDB } = require('../../../lib/mongodb');
import { connectToMongoDB } from "@/lib/mongodb";
// const MQTT_Cred = require("../../../models/MQTT_cred");
import MQTT_Cred from "@/models/MQTT_cred";
/**
 * @swagger
 * /api/mqtt_creds:
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
 * /api/mqtt_creds:
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
    
    try {
        await connectToMongoDB();
        const credlist=await MQTT_Cred.find();
        return Response.json({
            data: credlist
        })
    } catch (error) {
        return Response.json({
            message: 'Failed to Fetch MQTT Cred'
        })
    }
}

export async function POST(req) {
    try {
      await connectToMongoDB();
      const body = await req.json();
  
      // Destructure input fields from the request body
      const { mqtt_id, user_name, password } = body;
  
      // Create a new MQTT credential document
      const mqtt_cred = new MQTT_Cred({
        mqtt_id,
        user_name,
        password,
      });
  
      // Save the document to the database
      await mqtt_cred.save();
  
      // Return a successful response
      return new Response(
        JSON.stringify({
          data:mqtt_cred,
          message: 'Successfully Registered',
        }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    } catch (error) {
      // Handle errors and return a 500 response
      return new Response(
        JSON.stringify({
          message: error.message || 'Internal Server Error',
        }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }
  }
  
