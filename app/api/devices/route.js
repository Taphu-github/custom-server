import { connectToMongoDB } from "@/lib/mongodb";
import Device from "@/models/device";

/**
 * @swagger
 * /api/devices:
 *   get:
 *     summary: Get list of devices
 *     description: Retrieves all devices from the database.
 *     responses:
 *       200:
 *         description: List of devices
 *       400:
 *         description: Failed to fetch devices
 */

/**
 * @swagger
 * /api/devices:
 *   post:
 *     summary: Add a new device
 *     description: Adds a new device to the system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example:
 *               d_id: "string"
 *               d_name: "string"
 *               password: "string"
 *               location: "string"
 *               mac_address: "string"
 *     responses:
 *       200:
 *         description: Device added successfully
 *       400:
 *         description: Failed to add device
 */


export async function GET(){
    try{
        await connectToMongoDB();
        const list=await Device.find();
        return Response.json({
            data: list
        })
    }catch(error){
        return Response.json({
            message: error
        })
    }
}

export async function POST(req){
    try {
        await connectToMongoDB();
        const body= await req.json();
        const d_id = body.d_id;
        const d_name = body.d_name;
        const password = body.password;
        const location = body.location;
        const mac_address = body.mac_address;
        const installed_date = body.installed_date;

        const systemowner = new Device({
            d_id,
            d_name,
            password,
            location,
            mac_address,
            installed_date
        })
        if(d_id && d_name && password && location && mac_address && installed_date){
            await systemowner.save();

            return Response.json({
                systemowner,
                message: "Successfully Added"},
                {status: 200}
            )
        }else{

            return Response.json({
                message: "Missing value"
            },
            {status: 400})
        }
        
        
    } catch (error) {
        return Response.json({
            message: "error: "+error
        },{status: 400})
    }
}