
import { connectToMongoDB } from '../../../../lib/mongodb';
import device_owner from '@/models/device_owner';

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
    const dev_owner = await device_owner.findById(params.id);
    if (dev_owner) {
      return Response.json({
        dev_owner
      })
    }

    return Response.json({
      message: `Device Owner ${params.id} not found`
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
export async function PUT(req, { params }) {

  try {
    await connectToMongoDB();
    const { id } = params;
    const dev_own = device_owner.findById(id)
    const body = await req.json();
    
    if (dev_own) {
      dev_own.user_id = body.user_id;
      dev_own.d_id = body.d_id;
      dev_own.date = body.password;

      dev_own.save();
      return Response.json({
        device_owner
      })

    }
    return Response.json({
      message: `Device Owner ${id} not found`
    })

  } catch (error) {
    return Response.json({
      message: error
    }, {
      status: 400
    })
  }
}


export async function DELETE(req, { params }) {

  try {
    await connectToMongoDB();
    const { id } = params;
    const deleteItem = await device_owner.findById(id)
    if (deleteItem) {
      device_owner.findByIdAndDelete(id);
      return Response.json({
        message: `Device owner ${id} deleted successfully`
      })
    }
    return Response.json({
      message: `Device Owner ${id} not found`
    })
  } catch (error) {
    return Response.json({
      message: error
    })
  }
}


