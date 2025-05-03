const mongoose = require("mongoose");

const ItemCategory = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    remarks: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports =
  mongoose.models.ItemCategory || mongoose.model("ItemCategory", ItemCategory);
