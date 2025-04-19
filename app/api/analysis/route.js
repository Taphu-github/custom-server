import { connectToMongoDB } from "@/lib/mongodb";
import user from "@/models/user";
import device from "@/models/device";
import detected_animal from "@/models/detected_animal";
import { preprocessAnimalData } from "@/lib/data_preprocess";

export async function GET() {
  try {
    await connectToMongoDB();

    // Fetch data
    const userCount = await user.countDocuments();
    const deviceCount = await device.countDocuments();
    const idToAnimal = {
      0: "Bear",
      1: "Boar",
      2: "Cattle",
      3: "Deer",
      4: "Elephant",
      5: "Horse",
      6: "Monkey",
    };

    const latestDetect = await detected_animal
      .find({})
      .sort({ enroach_date: -1 }) // latest first
      .limit(5)
      .lean(); // important for modifying fields easily

    const recent = latestDetect.map((intrusion) => {
      return {
        ...intrusion,
        animal: idToAnimal[intrusion.a_c_id], // convert ID to name
      };
    });

    //   .select("animal time -_id"); // include only relevant fields

    const intrusionData = await preprocessAnimalData();

    const response = {
      ...intrusionData,
      users: userCount,
      devices: deviceCount,
      recent,
    };

    return Response.json({ message: response }, { status: 200 });
  } catch (error) {
    return Response.json({ message: error }, { status: 400 });
  }
}
