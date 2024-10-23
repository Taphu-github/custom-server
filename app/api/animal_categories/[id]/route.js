import { connectToMongoDB } from "@/lib/mongodb";
import animal_category from "@/models/animal_category";

/**
 * @swagger
 * /api/animal_categories/{id}:
 *   get:
 *     summary: Get a specific animal category
 *     description: Retrieves a single animal category by ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the animal category
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Animal category found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ani_cat:
 *                   type: object
 *       400:
 *         description: Animal category not found
 */

/**
 * @swagger
 * /api/animal_categories/{id}:
 *   put:
 *     summary: Update a specific animal category
 *     description: Updates an existing animal category by ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the animal category
 *         schema:
 *           type: string
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
 *               animal_name: "Lion"
 *               animal_description: "The king of the jungle"
 *     responses:
 *       200:
 *         description: Animal category updated successfully
 *       400:
 *         description: Animal category not found
 */

/**
 * @swagger
 * /api/animal_categories/{id}:
 *   delete:
 *     summary: Delete a specific animal category
 *     description: Deletes an animal category by ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the animal category
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Animal category deleted successfully
 *       400:
 *         description: Animal category not found
 */

export async function GET(_, { params }) {
    try {
        await connectToMongoDB();
        const ani_cat = await animal_category.findById(params.id);
        if (ani_cat) {
            return Response.json({
                ani_cat
            })
        }

        return Response.json({
            message: `Animal Category ${params.id} not found`
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
        const animal = animal_category.findById(id);
        if (animal) {
            animal.a_c_id = req.body.a_c_id;
            animal.animal_name = req.body.animal_name;
            animal.animal_description = req.body.animal_description;
            animal.save();
            return Response.json({
                message: "Succesfully updated"
            });
        }
        return Response.json({
            message: `Animal Category ${params.id} Not found`
        });

    } catch (error) {
        return Response.json(
            { message: error },
            { status: 400 }
        )
    }

}

export async function DELETE(_, { params }) {
    connectToMongoDB();
    try {
        const deleteItem = animal_category.findByIdAndDelete(params.id);
        if (deleteItem) {
            return Response.json({
                message: "Succesfully updated"
            });
        }

        return Response.json({
            message: `Animal Category ${params.id} not found `
        });
    } catch (error) {
        return Response.json(
            { message: error },
            { status: 400 }
        );
    }

}
