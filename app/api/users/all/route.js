import { connectToMongoDB } from "../../../../lib/mongodb";
import user from "@/models/user";

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
export async function GET(req) {
  try {
    // const { searchParams } = new URL(req.url);
    // const page = parseInt(searchParams.get("page")) || 1;
    // const limit = parseInt(searchParams.get("limit")) || 10;
    // const skip = (page - 1) * limit;

    // Build filter query
    // const filterQuery = {};
    // const filterFields = ["full_name", "dzongkhag", "gewog", "phone", "cid"];

    // filterFields.forEach((field) => {
    //   const value = searchParams.get(field);
    //   if (value) {
    //     filterQuery[field] = { $regex: value, $options: "i" };
    //   }
    // });

    await connectToMongoDB();

    // const totalUsers = await user.countDocuments(filterQuery);
    const userList = await user.find().sort({ createdAt: -1 }).exec();
    // .find(filterQuery)

    // .skip(skip)

    return Response.json({
      data: userList,
    });
  } catch (error) {
    return Response.json({ message: "error: " + error }, { status: 400 });
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

    const {
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
      role,
      remarks,
    } = body;

    // Optional: Check for duplicate email/cid
    const exists = await user.findOne({
      $or: [{ email }, { username }, { cid }],
    });
    if (exists) {
      return Response.json({ message: "User already exists" }, { status: 400 });
    }

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
      role,
      remarks: remarks ?? " ",
    });

    return Response.json({
      message: "Successfully Added",
      data: newUser,
    });
  } catch (error) {
    return Response.json(
      {
        message: error.message || "An unexpected error occurred",
      },
      {
        status: 400,
      }
    );
  }
}
