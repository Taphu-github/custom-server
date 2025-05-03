const mongoose = require("mongoose");
import ItemCategory from "./item_category"; // ✅ make sure this is imported

const Item = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    purchase_date: {
      type: Date,
      required: true,
    },
    supplier_name: {
      type: String,
      required: true,
    },
    unique_identifier: {
      type: String,
      required: true,
      unique: true,
    },
    specifications: {
      type: String,
      required: false,
    },
    model_number: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ItemCategory",
      required: true,
    },
    used: {
      type: String,
      required: true,
      enum: ["yes", "no"],
    },
    functional: {
      type: String,
      required: true,
      enum: ["yes", "no"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.models.Item || mongoose.model("Item", Item);
