import { connectToMongoDB } from "@/lib/mongodb";
import animal_category from "@/models/animal_category";

/**
 * @swagger
 * /api/animal_categories:
 *   get:
 *     summary: Get list of animal categories
 *     description: Retrieves all animal categories from the database.
 *     responses:
 *       200:
 *         description: List of animal categories
 *       400:
 *         description: Failed to fetch animal categories
 */

/**
 * @swagger
 * /api/animal_categories:
 *   post:
 *     summary: Add a new animal category
 *     description: Creates a new animal category in the system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               a_c_id:
 *                 type: string
 *               animal_name:
 *                 type: string
 *               animal_description:
 *                 type: string
 *             example:
 *               a_c_id: "1"
 *               animal_name: "Tiger"
 *               animal_description: "A large cat species"
 *     responses:
 *       200:
 *         description: Animal category added successfully
 *       400:
 *         description: Failed to add animal category
 */

export async function GET() {

    try {

        await connectToMongoDB();
        const list = await animal_category.find()
        return Response.json({
            data: list
        })
    } catch (error) {
        return Response.json({
            message: error
        })
    }


}

export async function POST(req) {
    try {
        await connectToMongoDB();
        const body = await req.json();
        const a_c_id = body.a_c_id;
        const animal_name = body.animal_name;
        const animal_description = body.animal_description;

        const animal_categories = new animal_category({
            a_c_id,
            animal_name,
            animal_description
        })
        await animal_categories.save()
        return Response.json({
            message: "Succesfully added"
        })
    } catch (error) {
        return Response.json({
            message: error
        })
    }
}
