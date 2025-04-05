import { connectToMongoDB } from "@/lib/mongodb";
import device_owner from "@/models/device_owner";
import user from "@/models/user";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectToMongoDB();

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;
    const skip = (page - 1) * limit;

    // Step 1: Fetch all device_owner records sorted by latest date
    const list = await device_owner.find().sort({ date_of_own: -1 });

    // Step 2: Aggregate devices per user, keeping order
    const aggregated = {};
    list.forEach(({ user_id, d_id, date_of_own }) => {
      if (!user_id) return;
      if (!aggregated[user_id]) aggregated[user_id] = [];

      aggregated[user_id].push({
        d_id,
        date_of_own: date_of_own?.toISOString()?.split("T")[0] || null,
        raw_date: new Date(date_of_own), // for sorting users later
      });
    });

    // Step 3: Convert to array and sort users by their most recent device date
    let result = Object.entries(aggregated).map(([user_id, d_ids]) => {
      return {
        user_id,
        d_ids: d_ids.map(({ d_id, date_of_own }) => ({ d_id, date_of_own })),
        latest_date: d_ids[0]?.raw_date || new Date(0), // latest device date
      };
    });

    // Sort users by latest device date
    result.sort((a, b) => b.latest_date - a.latest_date);

    const total = result.length;
    const paginatedResult = result.slice(skip, skip + limit);
    const final = await processResults(paginatedResult);

    return NextResponse.json(
      {
        data: final,
        pagination: {
          total,
          page,
          totalPages: Math.ceil(total / limit),
          hasMore: page * limit < total,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}

async function processResults(result) {
  const final = [];

  await Promise.all(
    result.map(async (data) => {
      const userData = await user.findOne({ user_id: data.user_id }).lean();
      const { latest_date, ...rest } = data; // remove internal field
      final.push({
        ...rest,
        user_name: userData?.username || "Unknown",
      });
    })
  );

  return final;
}
