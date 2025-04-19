// import { connectToMongoDB } from "@/lib/mongodb";
// import detected_animal from "@/models/detected_animal";
// /**
//  * @swagger
//  * /api/detected_animals:
//  *   get:
//  *     summary: gets detected animals
//  *     description: Retrieves detected animal data from the database.
//  *     responses:
//  *       200:
//  *         description: Successfully retrieved detected animal data
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 message:
//  *                   type: object
//  *                   description: The preprocessed animal data
//  *       400:
//  *         description: Failed to preprocess animal data
//  */
// export async function GET() {
//   try {
//     await connectToMongoDB();
//     const data = await detected_animal
//       .find()
//       // .populate({
//       //   path: "a_c_id",
//       //   select: "animal_name category_id", // Add any other fields you want from AnimalCategory
//       // })
//       .sort({ enroach_date: -1 });
//     // Optional: sort by date descending
//     console.log(data[0]);
//     return Response.json({ data: data }, { status: 200 });
//   } catch (error) {
//     return Response.json(
//       {
//         message: error,
//       },
//       { status: 400 }
//     );
//   }
// }

// --- BACKEND (API Route) ---
// File: /app/api/detected_animals/route.js
import { connectToMongoDB } from "@/lib/mongodb";
import detected_animal from "@/models/detected_animal";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectToMongoDB();

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;
    const skip = (page - 1) * limit;

    const deviceId = searchParams.get("deviceId") || "";
    const animalName = searchParams.get("animalName") || "";
    const encroachDate = searchParams.get("encroachDate") || "";
    const encroachTime = searchParams.get("encroachTime") || "";

    const animal_names = [
      "Bear",
      "Boar",
      "Cattle",
      "Deer",
      "Elephant",
      "Horse",
      "Monkey",
    ];

    let filter = {};

    if (deviceId) {
      filter.d_id = { $regex: deviceId, $options: "i" };
    }

    if (animalName) {
      const index = animal_names.findIndex(
        (name) => name.toLowerCase() === animalName.toLowerCase()
      );
      if (index !== -1) {
        filter.a_c_id = index;
      }
    }

    if (encroachDate) {
      filter.enroach_date = {
        $gte: new Date(`${encroachDate}T00:00:00.000Z`),
        $lte: new Date(`${encroachDate}T23:59:59.999Z`),
      };
    }

    if (encroachTime) {
      filter.enroach_time = { $regex: `^${encroachTime}` }; // match HH:mm
    }

    const total = await detected_animal.countDocuments(filter);

    const data = await detected_animal
      .find(filter)
      .sort({ enroach_date: -1 })
      .skip(skip)
      .limit(limit);

    return NextResponse.json({
      data,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
