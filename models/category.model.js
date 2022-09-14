import { model, Schema } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const categorySchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required to create category"],
      unique: [true, "Category with this title already exists"],
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);
categorySchema.plugin(uniqueValidator);
export const categoryModel = model("Category", categorySchema);
