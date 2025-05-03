import { NextResponse } from "next/server";
import { connectToMongoDB } from "@/lib/mongodb";
import Item from "@/models/item";

// GET all Items with filtering
export async function GET(request) {
  try {
    await connectToMongoDB();

    // Get search parameters from URL
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;
    const unique_identifier = searchParams.get("unique_identifier") || "";
    const model_number = searchParams.get("model_number") || "";
    const category = searchParams.get("category") || "";
    const purchase_date = searchParams.get("purchase_date") || "";
    const used = searchParams.get("used") || "";
    const functional = searchParams.get("functional") || "";

    // Calculate skip for pagination
    const skip = (page - 1) * limit;

    // Build filter object
    const filter = {};
    if (unique_identifier)
      filter.unique_identifier = { $regex: unique_identifier, $options: "i" };
    if (model_number)
      filter.model_number = { $regex: model_number, $options: "i" };
    if (category) filter.category = category; // Exact match for ObjectId
    if (purchase_date) {
      const startDate = new Date(purchase_date);
      startDate.setHours(0, 0, 0, 0);
      const endDate = new Date(purchase_date);
      endDate.setHours(23, 59, 59, 999);
      filter.purchase_date = { $gte: startDate, $lte: endDate };
    }
    if (used) filter.used = used;
    if (functional) filter.functional = functional;

    // Get total count for pagination
    const total = await Item.countDocuments(filter);

    // Get filtered and paginated data
    const list = await Item.find(filter)
      .populate("category")
      .sort({ purchase_date: -1 })
      .skip(skip)
      .limit(limit);

    return NextResponse.json({
      data: list,
      pagination: {
        total,
        page,
        totalPages: Math.ceil(total / limit),
        hasMore: page * limit < total,
      },
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST new Item
export async function POST(request) {
  try {
    const body = await request.json();
    await connectToMongoDB();
    const newItem = await Item.create(body);
    return NextResponse.json(newItem, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PUT update Item
export async function PUT(request) {
  try {
    const body = await request.json();
    const { id, ...updateData } = body;

    await connectToMongoDB();
    const updatedItem = await Item.findByIdAndUpdate(id, updateData, {
      new: true,
    }).populate("category");
    // .populate("device");

    if (!updatedItem) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    return NextResponse.json(updatedItem);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE Item
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    await connectToMongoDB();
    const deletedItem = await Item.findByIdAndDelete(id);

    if (!deletedItem) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Item deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
