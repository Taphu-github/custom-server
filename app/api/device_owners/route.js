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
    const d_id = searchParams.get("d_id");
    const user_id = searchParams.get("user_id");
    const user_name = searchParams.get("user_name")?.toLowerCase();

    const userFilter = {};
    if (user_id) userFilter.user_id = user_id;
    if (user_name) userFilter.username = { $regex: user_name, $options: "i" };

    let validUserIds = [];
    if (user_id || user_name) {
      const matchedUsers = await user.find(userFilter, "user_id username");
      validUserIds = matchedUsers.map((u) => u.user_id);
      if (validUserIds.length === 0) {
        return NextResponse.json({
          data: [],
          pagination: { total: 0, page, limit, totalPages: 0 },
        });
      }
    }

    const filter = {};
    if (d_id) filter.d_id = d_id;
    if (validUserIds.length > 0) filter.user_id = { $in: validUserIds };

    const skip = (page - 1) * limit;

    const raw = await device_owner
      .find(filter)
      .sort({ date_of_own: -1 })
      .skip(skip)
      .limit(limit);

    const grouped = raw.reduce((acc, item) => {
      console.log(item);
      const { _id, user_id, d_id, date_of_own, remarks } = item;
      if (!acc[user_id]) acc[user_id] = [];
      acc[user_id].push({ _id, d_id, date_of_own, remarks });
      return acc;
    }, {});

    const uniqueUserIds = Object.keys(grouped);
    const userDocs = await user.find(
      { user_id: { $in: uniqueUserIds } },
      "user_id username"
    );

    const userMap = userDocs.reduce((acc, u) => {
      acc[u.user_id] = u.username;
      return acc;
    }, {});

    const result = [];

    for (const [uid, d_ids] of Object.entries(grouped)) {
      const username = userMap[uid];
      if (!username) continue;
      result.push({
        user_id: uid,
        user_name: username,
        d_ids,
      });
    }

    const total = result.length;

    return NextResponse.json({
      data: result,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("GET /api/device-owners error:", error);
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}

export async function POST(req) {
  try {
    await connectToMongoDB();
    const body = await req.json();
    const { user_id, d_id, date_of_own } = body;

    if (!user_id || !d_id || !date_of_own) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if user exists
    const userExists = await user.findOne({ user_id });
    if (!userExists) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Check if user already has this device
    const userDeviceExists = await device_owner.findOne({
      user_id,
      d_id,
    });

    if (userDeviceExists) {
      return NextResponse.json(
        { message: "User already owns this device" },
        { status: 400 }
      );
    }

    // Create new device ownership
    const newDeviceOwner = new device_owner({
      user_id,
      d_id,
      date_of_own: new Date(date_of_own),
    });

    await newDeviceOwner.save();

    // Return the newly created device owner with user details
    const result = {
      user_id,
      user_name: userExists.username,
      d_ids: [
        {
          d_id,
          date_of_own: new Date(date_of_own),
        },
      ],
    };

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error("POST /api/device-owners error:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
