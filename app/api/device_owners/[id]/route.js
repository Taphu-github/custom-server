import { connectToMongoDB } from "../../../../lib/mongodb";
import device_owner from "@/models/device_owner";

/**
 * @swagger
 * /api/device-owners/{id}:
 *   get:
 *     summary: Get a device owner by ID
 *     description: Retrieves the details of a specific device owner using their ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the device owner to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Device owner found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 dev_owner:
 *                   type: object
 *       400:
 *         description: Device owner not found
 */

/**
 * @swagger
 * /api/device-owners/{id}:
 *   put:
 *     summary: Update a device owner
 *     description: Updates the details of an existing device owner.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the device owner to update
 *         schema:
 *           type: string
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
 *         description: Device owner updated successfully
 *       400:
 *         description: Device owner not found
 */

/**
 * @swagger
 * /api/device-owners/{id}:
 *   delete:
 *     summary: Delete a device owner
 *     description: Deletes a device owner by their ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the device owner to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Device owner deleted successfully
 *       400:
 *         description: Device owner not found
 */

export async function GET(_, { params }) {
  try {
    await connectToMongoDB();
    const user_id = Number(params.id);
    if (isNaN(user_id)) {
      return Response.json(
        {
          message: "Invalid user ID format",
        },
        {
          status: 400,
        }
      );
    }

    const dev_owner = await device_owner.find({ user_id });

    if (dev_owner && dev_owner.length > 0) {
      return Response.json({
        dev_owner,
      });
    }

    return Response.json(
      {
        message: `Device Owner with ID ${params.id} not found`,
      },
      {
        status: 404,
      }
    );
  } catch (error) {
    console.error("Error fetching device owner:", error);
    return Response.json(
      {
        message: "An error occurred while fetching the device owner",
      },
      {
        status: 500,
      }
    );
  }
}
// export async function PUT(req, { params }) {
//   try {
//     await connectToMongoDB();
//     const { id } = params;
//     const dev_own = device_owner.findById(id);
//     const body = await req.json();

//     if (dev_own) {
//       dev_own.user_id = body.user_id;
//       dev_own.d_id = body.d_id;
//       dev_own.date = body.password;

//       dev_own.save();
//       return Response.json({
//         device_owner,
//       });
//     }
//     return Response.json({
//       message: `Device Owner ${id} not found`,
//     });
//   } catch (error) {
//     return Response.json(
//       {
//         message: error,
//       },
//       {
//         status: 400,
//       }
//     );
//   }
// }
export async function PUT(req, { params }) {
  try {
    await connectToMongoDB();
    const { id } = params;
    const body = await req.json();

    const dev_own = await device_owner.findById(id);

    if (!dev_own) {
      return Response.json(
        { message: `Device Owner ${id} not found` },
        { status: 404 }
      );
    }

    dev_own.user_id = body.user_id;
    dev_own.d_id = body.d_id;
    dev_own.date_of_own = body.date_of_own;

    await dev_own.save();

    return Response.json({ dev_owner: dev_own });
  } catch (error) {
    console.error("Error updating device owner:", error);
    return Response.json({ message: error.message }, { status: 400 });
  }
}

// export async function DELETE(req, { params }) {
//   try {
//     await connectToMongoDB();
//     const user_id = Number(params.id);
//     const { d_id } = await req.json();

//     if (isNaN(user_id)) {
//       return Response.json(
//         { message: "Invalid user ID format" },
//         { status: 400 }
//       );
//     }

//     if (!d_id) {
//       return Response.json(
//         { message: "Device ID is required" },
//         { status: 400 }
//       );
//     }

//     // Find and delete the specific device ownership
//     const result = await device_owner.findOneAndDelete({
//       user_id,
//       d_id,
//     });

//     if (result) {
//       return Response.json({
//         message: `Device ${d_id} unassigned from user ${user_id} successfully`,
//         deleted: result,
//       });
//     }

//     return Response.json(
//       {
//         message: `No device ownership found for user ${user_id} and device ${d_id}`,
//       },
//       { status: 404 }
//     );
//   } catch (error) {
//     console.error("Error deleting device ownership:", error);
//     return Response.json(
//       { message: "An error occurred while deleting the device ownership" },
//       { status: 500 }
//     );
//   }
// }
export async function DELETE(req, { params }) {
  try {
    await connectToMongoDB();
    const { id } = params;
    const deleteItem = await device_owner.findById(id);
    if (deleteItem) {
      await device_owner.findByIdAndDelete(id);
      return Response.json({
        message: `Device owner ${id} deleted successfully`,
      });
    }
    return Response.json({
      message: `Device Owner ${id} not found`,
    });
  } catch (error) {
    return Response.json({
      message: error,
    });
  }
}
