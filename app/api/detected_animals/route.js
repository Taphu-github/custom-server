import { connectToMongoDB } from "@/lib/mongodb";
import detected_animal from "@/models/detected_animal";
/**
 * @swagger
 * /api/detected_animals:
 *   get:
 *     summary: gets detected animals
 *     description: Retrieves detected animal data from the database.
 *     responses:
 *       200:
 *         description: Successfully retrieved detected animal data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: object
 *                   description: The preprocessed animal data
 *       400:
 *         description: Failed to preprocess animal data
 */
export async function GET() {
  try {
    await connectToMongoDB();
    const data = await detected_animal.find();
    // .populate({
    //   path: "a_c_id",
    //   select: "animal_name category_id", // Add any other fields you want from AnimalCategory
    // })
    // .sort({ enroach_date: -1 });
    // Optional: sort by date descending
    console.log(data[0]);
    return Response.json({ data: data }, { status: 200 });
  } catch (error) {
    return Response.json(
      {
        message: error,
      },
      { status: 400 }
    );
  }
}
