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

export async function GET(req) {
  try {
    await connectToMongoDB();

    // Get search parameters from URL
    // const { searchParams } = new URL(req.url);
    // const page = parseInt(searchParams.get("page")) || 1;
    // const limit = parseInt(searchParams.get("limit")) || 10;
    // const d_name = searchParams.get("d_name") || "";
    // const d_id = searchParams.get("d_id") || "";
    // const location = searchParams.get("location") || "";

    // Calculate skip for pagination
    // const skip = (page - 1) * limit;

    // Build filter object
    // const filter = {};
    // if (d_name) filter.d_name = { $regex: d_name, $options: "i" };
    // if (d_id) filter.d_id = { $regex: d_id, $options: "i" };
    // if (location) filter.location = { $regex: location, $options: "i" };

    // Get total count for pagination
    // const total = await Device.countDocuments(filter);

    // Get filtered and paginated data
    const list = await Device.find().sort({ installed_date: -1 });
    // .skip(skip)
    // .limit(limit);

    return Response.json({
      data: list,
    });
  } catch (error) {
    return Response.json(
      {
        message: error.message,
      },
      { status: 400 }
    );
  }
}

export async function POST(req) {
  try {
    await connectToMongoDB();
    const body = await req.json();
    const d_id = body.d_id;
    const d_name = body.d_name;
    const password = body.password;
    const location = body.location;
    const mac_address = body.mac_address;
    const installed_date = body.installed_date;
    const remarks = body.remarks;

    const systemowner = new Device({
      d_id,
      d_name,
      password,
      location,
      mac_address,
      installed_date,
      remarks,
    });

    if (
      d_id &&
      d_name &&
      password &&
      location &&
      mac_address &&
      installed_date &&
      remarks
    ) {
      await systemowner.save();

      return Response.json(
        {
          systemowner,
          message: "Successfully Added",
        },
        { status: 200 }
      );
    } else {
      return Response.json(
        {
          message: "Missing value",
        },
        { status: 400 }
      );
    }
  } catch (error) {
    return Response.json(
      {
        message: "error: " + error,
      },
      { status: 400 }
    );
  }
}
