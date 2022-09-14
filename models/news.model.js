import { model, Schema } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const newsSchema = new Schema(
  {
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
    title: {
      type: String,
      require: [true, "Title is required to create news"],
    },
    imageURL: {
      type: String,
      require: [true, "Image url or file is required to create news"],
    },
    slug: {
      type: String,
      require: [true, "Title is required to create news"],
      unique: [true, "News with this slug already exists"],
    },
    body: {
      type: String,
      require: [true, "Body is required to create news"],
    },
    viewsCount: {
      type: Number,
      default: 0,
    },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

newsSchema.plugin(uniqueValidator);
export const newsModel = model("News", newsSchema);
