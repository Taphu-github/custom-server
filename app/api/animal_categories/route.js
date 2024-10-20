import { connectToMongoDB } from "@/lib/mongodb";
import animal_category from "@/models/animal_category";


export async function GET() {
    connectToMongoDB();
    try {
        const list = animal_category.find()
        return Response.json({
            message: list
        })
    } catch (error) {
        return Response.json({
            message: error
        })
    }


}

export async function POST(req) {
    try {
        const a_c_id = req.body.a_c_id;
        const animal_name = req.body.animal_name;
        const animal_description = req.body.animal_description;

        const animal_categories = new animal_category({
            a_c_id,
            animal_name,
            animal_description
        })
        animal_categories.save()
        return Response.json({
            message: "Succesfully added"
        })
    } catch (error) {
        return Response.json({
            message: error
        })
    }
}
