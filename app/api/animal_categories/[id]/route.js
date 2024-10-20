import { connectToMongoDB } from "@/lib/mongodb";
import animal_category from "@/models/animal_category";


export async function PUT(req) {
    connectToMongoDB();
    try {

        animal_category.findById(req.query)
            .then(animal => {
                animal.a_c_id = req.query;
                animal.animal_name = req.body.animal_name;
                animal.animal_description = req.body.animal_description;
                animal.save();

            })
        return Response.json({
            message: "Succesfully updated"
        });

    } catch (error) {
        return Response.json({
            message: error
        })
    }

}

export async function DELETE() {
    connectToMongoDB();
    try {
        const deleteItem = animal_category.findByIdAndDelete(req.params.id);
        return Response.json({
            message: "Succesfully updated"
        });
    } catch (error) {
        return Response.json({
            message: error
        });
    }

}