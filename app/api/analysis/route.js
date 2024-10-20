import { connectToMongoDB } from '@/lib/mongodb';
import user from '@/models/user';
import device from '@/models/device';
import detected_animal from '@/models/detected_animal';
import { preprocessAnimalData } from '@/lib/data_preprocess';

/**
 * 
 * total_animal_count
 * total_animal_count_by_category
 * total_animal_count_by_device
 */
export async function GET() {
    connectToMongoDB();
    try {
        const data = await preprocessAnimalData();
        console.log(data);

        return Response.json({
            message: data
        });
    } catch (error) {
        return Response.json({
            message: error
        });
    }
}