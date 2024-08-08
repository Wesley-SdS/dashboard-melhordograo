// src/models/Category.ts
import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  status: { type: String, default: "Active" }
});

export default mongoose.model("Category", categorySchema);
