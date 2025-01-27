import { connectToMongoDB } from "@/lib/mongodb";
import Device from "@/models/device";
import device_owner from "@/models/device_owner";
import user from "@/models/user";


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
        const user_id = body.user_id;

        const dev = await Device.findOne({"d_id": d_id});

        if (!dev) {
            return Response.json({
                message: "Device not found"
            }, {status: 400})
        }



        const passwordMatch = await dev.comparePassword(password);
        if (!passwordMatch) {
            return Response.json({
                message: "Incorrect Password"
            }, {status: 400})
        }

        const device_owners=await device_owner.find({"user_id":user_id, "d_id":d_id})
        console.log("device owner")
        console.log(device_owners)
        console.log(device_owners[0]._id)
        let device_owner_id=""
        if(device_owners.length==0){
            var cur_date=new Date()
            const new_device_owner = await device_owner.create({
                        user_id,
                        d_id,
                        cur_date
                    })
            console.log(new_device_owner)

            device_owner_id=new_device_owner._id
        }else{
            device_owner_id=device_owners[0]._id
        }


        console.log(device_owner_id)
        return Response.json(
            {data:{ _id:dev._id , d_id:dev.d_id, d_name:dev.d_name, d_location:dev.location, device_owner_id:device_owner_id},
            message: "Successfully Added Device"},
            {status: 200}
        )

    } catch (error) {
        return Response.json({
            message: "error: "+error
        },
        {status: error.status})
    }
}