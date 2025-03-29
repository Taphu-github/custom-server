import { connectToMongoDB } from "@/lib/mongodb";
import user from "@/models/user";

/**
 * @swagger
 * /api/users/{id}/password:
 *   patch:
 *     summary: Update user password
 *     description: Updates the password for a specific user
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The user ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newPassword:
 *                 type: string
 *                 required: true
 *     responses:
 *       200:
 *         description: Password updated successfully
 *       404:
 *         description: User not found
 */
export async function PATCH(req, { params }) {
  try {
    await connectToMongoDB();
    const { id } = params;
    const { newPassword } = await req.json();
    const u = await user.findById(id);
    console.log(u);
    if (!u) {
      return Response.json(
        {
          message: `User ${id} not found`,
        },
        { status: 404 }
      );
    }

    // Hash and update new password
    // const salt = await bcrypt.genSalt();
    u.password = newPassword;
    // console.log(await bcrypt.hash(newPassword, salt));
    await u.save();

    return Response.json({
      message: "Password updated successfully",
    });
  } catch (error) {
    return Response.json(
      {
        message: "Error: " + error.message,
      },
      { status: 500 }
    );
  }
}
