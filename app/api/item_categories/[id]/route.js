import { NextResponse } from "next/server";
import { connectToMongoDB } from "@/lib/mongodb";
import AddonCategory from "@/models/item_category";

// GET category by id
export async function GET(request, { params }) {
  try {
    const { id } = params;
    await connectToMongoDB();

    const category = await AddonCategory.findById(id);

    if (!category) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(category);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PATCH update category
export async function PATCH(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();

    await connectToMongoDB();
    const updatedCategory = await AddonCategory.findByIdAndUpdate(id, body, {
      new: true,
    });

    if (!updatedCategory) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedCategory);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE category
export async function DELETE(request, { params }) {
  try {
    const { id } = params;

    await connectToMongoDB();
    const deletedCategory = await AddonCategory.findByIdAndDelete(id);

    if (!deletedCategory) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Category deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
