import { connectToMongoDB } from "@/lib/mongodb";
import Device from "@/models/device";


/**
 * @swagger
 * /api/devices/login:
 *   post:
 *     summary: Device login
 *     description: Authenticates a device and returns the device topic.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               username: "user@example.com"
 *               password: "string"
 *     responses:
 *       200:
 *         description: Device Added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 
 *                 topics:
 *                   type: string
 *       400:
 *         description: Device not found or ERROR Message
 */

export async function POST(req){
    try {
        await connectToMongoDB();
        const body= await req.json();
        const d_id = body.username;
        const password = body.password;

        const dev = await Device.findOne({"d_id": d_id});


        if (!dev) {
            return Response.json({
                message: "User not found"
            }, {status: 400})
        }



        const passwordMatch = await dev.comparePassword(password);
        if (!passwordMatch) {
            return Response.json({
                message: "Incorrect Password"
            }, {status: 400})
        }

        return Response.json(
            {data:dev,
            message: "Successfully Added Device"},
            {status: 200}
        )
        
    } catch (error) {
        return Response.json({
            message: "error: "+error
        },
        {status: 400})
    }
}