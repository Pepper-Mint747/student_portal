import { model, Schema } from "mongoose";

const commentSchema = new Schema(
  {
    body: {
      type: String,
      require: [true, "Body is required to create a comment"],
    },
    news: {
      type: Schema.Types.ObjectId,
      ref: "News",
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const commentModel = model("Comment", commentSchema);
