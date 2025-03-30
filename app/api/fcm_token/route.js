import { connectToMongoDB } from "@/lib/mongodb";
import fcm_token from "@/models/fcm_token.cjs";

/**
 * @swagger
 * /api/owners:
 *   get:
 *     summary: Get list of device owners
 *     description: Retrieves all device owners from the database.
 *     responses:
 *       200:
 *         description: List of device owners
 *       400:
 *         description: Failed to fetch device owners
 */

export async function GET() {
  try {
    await connectToMongoDB();
    const fcm_token_list = await fcm_token.find();

    return Response.json({
      data: fcm_token_list,
    });
  } catch (error) {
    return Response.json({
      message: "error: " + error,
    });
  }
}

export async function POST(req) {
  try {
    await connectToMongoDB();
    const body = await req.json();
    const user_id = body["user_id"];
    const fcm_tokens = body["fcm_token"];

    console.log(fcm_tokens);
    const fcm_token_user = await fcm_token.findOne({ user_id: user_id });

    if (!fcm_token_user) {
      const new_fcm_token = await fcm_token.create({
        user_id,
        fcm_token: fcm_tokens,
      });

      await new_fcm_token.save();

      return Response.json({
        state: true,
      });
    } else {
      const fcm_token_user_patch = await fcm_token.findById(fcm_token_user._id);
      if (fcm_token_user_patch) {
        fcm_token_user_patch.user_id = user_id || fcm_token_user_patch.user_id;
        fcm_token_user_patch.fcm_token =
          fcm_tokens || fcm_token_user_patch.fcm_token;

        // Save the updated device
        await fcm_token_user_patch.save();

        return Response.json({
          state: true,
        });
      }
    }
  } catch (error) {
    console.log(error);
    return Response.json({
      state: false,
      error: error,
    });
  }
}
