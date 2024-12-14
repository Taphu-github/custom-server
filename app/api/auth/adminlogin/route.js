import { connectToMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import device_owner from "@/models/device_owner";
import MQTT_cred from "@/models/MQTT_cred";
import jwt from "jsonwebtoken";

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: User login
 *     description: Authenticates a user and returns a token and associated device IDs.
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
 *         description: User authenticated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                 topics:
 *                   type: array
 *                   items:
 *                     type: string
 *       400:
 *         description: User not found or incorrect password
 */

export async function POST(req) {

    try {
        await connectToMongoDB();
        const body = await req.json();
        const username=body['username'];
        const password=body['password'];

        const user = await User.findOne({ "username": username });
        

        if (!user) {
            return Response.json({
                message: "User not found"
            },{
                status: 400
            })
        }
        //console.log(user);

        if (user.role!="admin"){
            return Response.json({
                message: "User is not admin"
            },{
                status: 400
            })
        }

        const passwordMatch = await user.comparePassword(password);
        if (!passwordMatch) {
            return Response.json({
                message: "Incorrect Password"
            },
            {
                status: 400
            })
        }

        const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
            expiresIn: '1 hour'
        });

        let uid = user.user_id;

        let devices = await device_owner.find({"user_id": uid});
        let device_arr = []

        
        devices.map(device => {
            device_arr.push(device.d_id)
        })

        console.log(device_arr);
        const credlist=await MQTT_cred.find();

        return Response.json({
            user: user,
            token: token,
            topics: device_arr,
            mqtt_creds: credlist

        },{
            status: 200
        })
    } catch (error) {
        return Response.json({
            message: "error"+error
        },{
            status: 400
        })
    }



}