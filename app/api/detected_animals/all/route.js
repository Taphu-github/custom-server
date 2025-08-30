// import { connectToMongoDB } from "@/lib/mongodb";
// import detected_animal from "@/models/detected_animal";
// import { NextResponse } from "next/server";

// export async function GET(req) {
//   try {
//     await connectToMongoDB();

//     const { searchParams } = new URL(req.url);

//     const deviceId = searchParams.get("deviceId") || "";
//     const animalName = searchParams.get("animalName") || "";
//     const encroachDate = searchParams.get("encroachDate") || "";
//     const encroachTime = searchParams.get("encroachTime") || "";

//     const animal_names = [
//       "Bear",
//       "Boar",
//       "Cattle",
//       "Deer",
//       "Elephant",
//       "Horse",
//       "Monkey",
//     ];

//     // BUILD FILTER
//     let filter = {};

//     if (deviceId) {
//       filter.d_id = { $regex: deviceId, $options: "i" };
//     }

//     if (animalName) {
//       const index = animal_names.findIndex(
//         (name) => name.toLowerCase() === animalName.toLowerCase()
//       );
//       if (index !== -1) {
//         filter.a_c_id = index;
//       }
//     }

//     if (encroachDate) {
//       filter.enroach_date = {
//         $gte: new Date(`${encroachDate}T00:00:00.000Z`),
//         $lte: new Date(`${encroachDate}T23:59:59.999Z`),
//       };
//     }

//     if (encroachTime) {
//       filter.enroach_time = { $regex: `^${encroachTime}` };
//     }

//     // GET ALL DATA (NO PAGINATION)
//     const data = await detected_animal.find(filter).sort({ enroach_date: -1 });

//     return NextResponse.json({
//       data,
//       total: data.length,
//     });
//   } catch (error) {
//     return NextResponse.json({ message: error.message }, { status: 400 });
//   }
// }

import { connectToMongoDB } from "@/lib/mongodb";
import detected_animal from "@/models/detected_animal";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectToMongoDB();
    const { searchParams } = new URL(req.url);
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

    // BUILD FILTER
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
      filter.enroach_time = { $regex: `^${encroachTime}` };
    }

    // OPTION: Use aggregation for perfect datetime sorting
    const data = await detected_animal.aggregate([
      { $match: filter },
      {
        $addFields: {
          // Create a combined datetime field for accurate sorting
          combinedDateTime: {
            $dateFromString: {
              dateString: {
                $concat: [
                  { $dateToString: { format: "%Y-%m-%d", date: "$enroach_date" } },
                  "T",
                  "$enroach_time",
                  ".000Z"
                ]
              }
            }
          }
        }
      },
      { $sort: { combinedDateTime: -1 } }, // Sort by combined datetime descending
      { $unset: "combinedDateTime" } // Remove the temporary field from results
    ]);

    return NextResponse.json({
      data,
      total: data.length,
    });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}