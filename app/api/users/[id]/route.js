import { connectToMongoDB } from '@/lib/mongodb';
import user from '@/models/user';

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     description: Retrieves a specific user by ID from the database.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The user ID.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User object returned
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 u:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     username:
 *                       type: string
 *                     email:
 *                       type: string
 *                     full_name:
 *                       type: string
 *       400:
 *         description: User not found or invalid ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User {id} not found"
 */

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Update a user by ID
 *     description: Updates user details by ID in the database.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The user ID.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: string
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
 *     responses:
 *       200:
 *         description: User object updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 u:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     username:
 *                       type: string
 *                     email:
 *                       type: string
 *                     full_name:
 *                       type: string
 *       400:
 *         description: User not found or invalid input
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User {id} not found or invalid input"
 */

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     description: Deletes a specific user by ID from the database.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The user ID.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User {id} has been deleted successfully"
 *       400:
 *         description: User not found or invalid ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User {id} not found"
 */

export async function GET(_, { params }) {
    try {
        await connectToMongoDB();
        const u = await user.findById(params.id);
        if (u) {
            return Response.json({
                u
            })
        }

        return Response.json({
            message: `User ${params.id} not found`
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
        const body = await req.json();
       
        const salt = await bcrypt.genSalt();
        const pass= await bcrypt.hash(body.password, salt);

        const u = user.findById(id);
        if (u) {
            u.user_id = body.user_id;
            u.username = body.username;
            u.email = body.email;
            u.password = pass;
            u.cid = body.cid;
            u.full_name = body.full_name;
            u.phone = body.phone;
            u.dzongkhag = body.dzongkhag;
            u.gewog = body.gewog;
            u.village = body.village;

            u.save();
            return Response.json({
                u
            })

        }

        return Response.json({
            message: `user ${params.id} not found`
        })

    } catch (error) {
        return Response.json({
            message: error
        })
    }
}


export async function DELETE(req, { params }) {

    try {
        connectToMongoDB();
        const { id } = params;
        const u = user.findById(id);
        if (u) {
            await user.findByIdAndDelete(id);

            return Response.json({
                message: `user ${id} has been deleted successfully`
            })
        }
        return Response.json({
            message: `user ${id} not found`
        }, {
            status: 200
        })
    } catch (error) {
        return Response.json({
            message: "error" + error
        }, {
            status: 400
        })
    }
}
