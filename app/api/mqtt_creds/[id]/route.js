import { connectToMongoDB } from "@/lib/mongodb";
import MQTT_cred from "@/models/MQTT_cred";


/**
 * @swagger
 * /api/mqtt_creds/{id}:
 *   get:
 *     summary: Get MQTT credentials by ID
 *     description: Fetches a specific MQTT credential by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: MQTT credential found
 *       400:
 *         description: MQTT credential not found or invalid ID
 */

/**
 * @swagger
 * /api/mqtt_creds/{id}:
 *   put:
 *     summary: Update MQTT credentials by ID
 *     description: Updates the details of an existing MQTT credential.
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
 *               mqtt_id: "string"
 *               user_name: "string"
 *               password: "string"
 *     responses:
 *       200:
 *         description: MQTT credential updated successfully
 *       400:
 *         description: MQTT credential not found or invalid input
 */

/**
 * @swagger
 * /api/mqtt_creds/{id}:
 *   delete:
 *     summary: Delete MQTT credentials by ID
 *     description: Deletes an MQTT credential by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: MQTT credential deleted successfully
 *       400:
 *         description: MQTT credential not found or deletion failed
 */


export async function GET(_, { params }) {
  try {
    await connectToMongoDB();
    const mqtt = await MQTT_cred.findById(params.id);
    if (mqtt) {
      return Response.json({
        mqtt
      })
    }

    return Response.json({
      message: `MQTT Cred ${params.id} not found`
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
    const id = params;
    const mqtt_credit = MQTT_cred.findById(id);
    const body= await req.json();
    if (mqtt_credit) {
      mqtt_credit.mqtt_id = body.mqtt_id;
      mqtt_credit.user_name = body.user_name;
      mqtt_credit.password = body.password;

      mqtt_credit.save();
      return Response.json({
        mqtt_credit
      });
    }
    return Response.json({
      message: `mqtt ${id} is not found`
    }, {
      status: 400
    });

  } catch (error) {
    return Response.json({
      message: error
    });
  }
}


export async function DELETE(req, { params }) {
  connectToMongoDB();
  const id = params;
  try {
    const deleteItem = MQTT_cred.findByIdAndDelete(id);
    return Response.json({
      message: 'Success'
    });
  } catch (error) {
    return Response.json({
      message: 'Failed to Fetch MQTT Cred'
    });
  }
}

