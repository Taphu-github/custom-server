import { connectToMongoDB } from '@/lib/mongodb';
import user from '@/models/user';
import device from '@/models/device';
import device_owner from '@/models/device_owner';
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

export async function GET(_, { params }) {
    
    try {
        const { id } = params; // Extract the ID
        await connectToMongoDB();

        const devices = await device_owner.find({"user_id": id});

        let device_list = [];

        for(let dev of devices){
            device_list.push(dev.d_id);
        }

        console.log(device_list);

        const data = await preprocessAnimalData(device_list);

        
        return Response.json(
            {message: data},{status: 200});
    } catch (error) {
        console.log(error)
        return Response.json({
            message: error
        }, {status: 400} );
    }
}