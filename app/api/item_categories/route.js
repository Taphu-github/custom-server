import { connectToMongoDB } from "@/lib/mongodb";
import ItemCategory from "@/models/item_category";
import { NextResponse } from "next/server";

// GET all categories with filtering and pagination
export async function GET(request) {
  try {
    await connectToMongoDB();

    // Get the search parameters
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;
    const name = searchParams.get("name");

    // Calculate skip value for pagination
    const skip = (page - 1) * limit;

    // Build query object
    const query = {};
    if (name) {
      query.name = { $regex: name, $options: "i" }; // Case-insensitive search
    }

    // Execute query with pagination
    const [categories, total] = await Promise.all([
      ItemCategory.find(query).skip(skip).limit(limit).sort({ createdAt: -1 }),
      ItemCategory.countDocuments(query),
    ]);

    // Calculate pagination info
    const totalPages = Math.ceil(total / limit);

    return NextResponse.json({
      data: categories,
      pagination: {
        total,
        page,
        totalPages,
      },
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST new category
export async function POST(request) {
  try {
    await connectToMongoDB();
    const body = await request.json();
    const newCategory = await ItemCategory.create(body);
    return NextResponse.json(newCategory, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
