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

export async function PATCH(req, { params }) {
  try {
    await connectToMongoDB();
    const { id } = params; // Extract `id` from `params`
    const mqtt_credit = await MQTT_cred.findById(id); // Add `await` to ensure the database query resolves

    if (mqtt_credit) {
      const body = await req.json();

      // Update the fields
      mqtt_credit.mqtt_id = body.mqtt_id || mqtt_credit.mqtt_id;
      mqtt_credit.user_name = body.user_name || mqtt_credit.user_name;
      mqtt_credit.password = body.password || mqtt_credit.password;

      await mqtt_credit.save(); // Ensure changes are saved to the database

      return new Response(
        JSON.stringify({ mqtt_credit }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ message: `MQTT credit with ID ${id} not found` }),
      { status: 404, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ message: error.message || "Internal Server Error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}



export async function DELETE(req, { params }) {
  try {
    await connectToMongoDB(); // Ensure the connection is awaited

    const { id } = params; // Destructure `id` from `params`

    const deleteItem = await MQTT_cred.findByIdAndDelete(id); // Await the deletion operation

    if (!deleteItem) {
      // Handle case where no item was found
      return new Response(
        JSON.stringify({
          message: `MQTT Cred with ID ${id} not found`,
          ok: false,
        }),
        {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Return success response
    return new Response(
      JSON.stringify({
        message: 'Successfully deleted MQTT Cred',
        ok: true,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    // Return error response
    return new Response(
      JSON.stringify({
        message: 'Failed to delete MQTT Cred',
        error: error.message || 'Internal Server Error',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}


