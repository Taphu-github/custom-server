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


/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Add a new user
 *     description: Creates a new user in the system with the provided details.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: number
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               cid:
 *                 type: string
 *               full_name:
 *                 type: string
 *               phone:
 *                 type: string
 *               dzongkhag:
 *                 type: string
 *               gewog:
 *                 type: string
 *               village:
 *                 type: string
 *               role:
 *                 type: string
 *             example:
 *               user_id: 0
 *               username: "string"
 *               email: "user@example.com"
 *               password: "string"
 *               cid: "string"
 *               full_name: "string"
 *               phone: "string"
 *               dzongkhag: "string"
 *               gewog: "string"
 *               village: "string"
 *               role: "string"
 *     responses:
 *       200:
 *         description: User registered successfully
 *       400:
 *         description: Error during registration
 */


export async function POST(req) {

    try {

        await connectToMongoDB();
        const body = await req.json();
        const user_id = body["user_id"];
        const username = body["username"];
        const email = body["email"];
        const password = body["password"];
        const cid = body["cid"];
        const full_name = body["full_name"];
        const phone = body['phone'];
        const dzongkhag = body['dzongkhag'];
        const gewog = body['gewog'];
        const village = body['village'];
        const role = body['role'];

        const newUser = await user.create({
            user_id,
            username,
            email,
            password,
            cid,
            full_name,
            phone,
            dzongkhag,
            gewog,
            village,
            role
        });

        newUser.save();
        return Response.json({
            message: 'Succesfully Added',
            data: newUser
        })
    } catch (error) {
        return Response.json({
            message: "error "+error
        },{
            status: 400
        })
    }
}