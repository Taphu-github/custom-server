import { connectToMongoDB } from '@/lib/mongodb';
import user from '@/models/user';
import device from '@/models/device';
import detected_animal from '@/models/detected_animal';
import { preprocessAnimalData } from '@/lib/data_preprocess';

/**
 * @swagger
 * /api/analysis:
 *   get:
 *     summary: Preprocess animal data
 *     description: Retrieves preprocessed animal data from the database.
 *     responses:
 *       200:
 *         description: Successfully retrieved preprocessed animal data
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
        const data = await preprocessAnimalData();
        
        return Response.json(
            {message: data},{status: 200});
    } catch (error) {
        return Response.json({
            message: error
        }, {status: 400} );
    }
}