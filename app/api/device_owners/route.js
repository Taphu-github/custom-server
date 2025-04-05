import { connectToMongoDB } from "@/lib/mongodb";
import device_owner from "@/models/device_owner";
import user from "@/models/user";

/**
 * @swagger
 * /api/device-owners:
 *   get:
 *     summary: Get list of device owners
 *     description: Retrieves all device owners from the database.
 *     responses:
 *       200:
 *         description: List of device owners
 *       400:
 *         description: Failed to fetch device owners
 */

/**
 * @swagger
 * /api/device-owners:
 *   post:
 *     summary: Add a new device owner
 *     description: Adds a new device owner to the system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example:
 *               user_id: "number"
 *               d_id: "string"
 *               date_of_own: "YYYY-MM-DD"
 *     responses:
 *       200:
 *         description: Device owner added successfully
 *       400:
 *         description: Failed to add device owner
 */

export async function GET() {
  try {
    await connectToMongoDB();
    const list = await device_owner.find().sort({ date_of_own: -1 });
    return Response.json({
      data: list,
    });
  } catch (error) {
    return Response.json({
      message: error,
    });
  }
}

export async function POST(req) {
  try {
    await connectToMongoDB();
    const body = await req.json();

    const user_id = body.user_id;
    const d_id = body.d_id;
    const date_of_own = body.date_of_own;

    const new_device_owner = await device_owner.create({
      user_id,
      d_id,
      date_of_own,
    });

    new_device_owner.save();

    return Response.json(
      {
        new_device_owner,
        message: "Successfully added",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return Response.json({
      message: "error: " + error,
    });
  }
}
