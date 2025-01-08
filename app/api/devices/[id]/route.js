import { connectToMongoDB } from "@/lib/mongodb";
import Device from "@/models/device";
import bcrypt from "bcryptjs";
import device_owner from '@/models/device_owner';

/**
 * @swagger
 * /api/devices/{id}:
 *   get:
 *     summary: Get a device by ID
 *     description: Fetches a specific device by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Device found
 *       400:
 *         description: Device not found or invalid ID
 */

/**
 * @swagger
 * /api/devices/{id}:
 *   put:
 *     summary: Update a device by ID
 *     description: Updates the details of a specific device.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
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
 *         description: Device updated successfully
 *       400:
 *         description: Device not found or invalid input
 */

/**
 * @swagger
 * /api/devices/{id}:
 *   delete:
 *     summary: Delete a device by ID
 *     description: Deletes a specific device by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Device deleted successfully
 *       400:
 *         description: Device not found or deletion failed
 */

export async function GET(_, { params }) {
  try {
    await connectToMongoDB();
    const dev = await Device.findById(params.id);
    if (dev) {
      return Response.json({
        dev
      })
    }

    return Response.json({
      message: `Device ${params.id} not found`
    },
      {
        status: 400
      })
  } catch (error) {
    return Response.json({
      message: error
    }, {
      status: 400
    })
  }
}

export async function PATCH(req, { params }) {

  try {
    const { id } = params;
    await connectToMongoDB();
    const body = await req.json();

    const device = await Device.findById(id);

    if(device) {
      device.d_id = body.d_id || device.d_id;
      device.d_name = body.d_name || device.d_name;
      device.location = body.location || device.location;
      device.mac_address = body.mac_address || device.mac_address;
      device.installed_date = body.installed_date || device.installed_date;

      // Save the updated device
      await device.save();

        return Response.json({
          device,
          message: 'Success'
        });


    }

    return Response.json({
      message: `Device ${params.id} not found`
    });

  } catch (error) {
    return Response.json({
      message: 'error: '+error
    },
      { status: 400 }
    );
  }
}


export async function DELETE(req, {params}) {
  try {
    await connectToMongoDB();
    const id = params.id;
    // Find and delete the device
    const deleteItem = await Device.findByIdAndDelete(id);

    if (!deleteItem) {
      return new Response(
        JSON.stringify({ message: `Device with ID ${id} not found` }),
        { status: 404 }
      );
    }

    const device_owners=await device_owner.find({"d_id":deleteItem.d_id})

    device_owners.forEach(async({_id}) => {
        await device_owner.findByIdAndDelete(_id);
    });



    // Return success response
    return new Response(
      JSON.stringify({
        message: `Device ${deleteItem.d_id} has been deleted`,
        data: deleteItem,
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    // Handle errors
    return new Response(
      JSON.stringify({ message: `Error: ${error.message}` }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}


