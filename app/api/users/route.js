import { connectToMongoDB } from '../../../lib/mongodb';
import user from '@/models/user';

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get list of users
 *     description: Returns the user list from the database.
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       email:
 *                         type: string
 *       400:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "error: Something went wrong"
 */
export async function GET() {

    try {
        await connectToMongoDB();
        const userlist = (await user.find());

        return Response.json({
            data: userlist
        })
    } catch (error) {
        return Response.json({
            message: "error: " + error
        })
    }
}

