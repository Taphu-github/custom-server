import { NextResponse } from "next/server";
import { connectToMongoDB } from "@/lib/mongodb";
import Item from "@/models/item";

// GET Item by id
export async function GET(request, { params }) {
  try {
    const { id } = params;
    await connectToMongoDB();

    const item = await Item.findById(id).populate("category");

    if (!item) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    return NextResponse.json(item);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PATCH update Item
export async function PATCH(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    const { _id, ...updateData } = body;

    await connectToMongoDB();
    const updatedItem = await Item.findByIdAndUpdate(id, updateData, {
      new: true,
    }).populate("category");

    if (!updatedItem) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    return NextResponse.json(updatedItem);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE Item
export async function DELETE(request, { params }) {
  try {
    const { id } = params;

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
