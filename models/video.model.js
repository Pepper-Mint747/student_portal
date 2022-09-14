import { model, Schema } from "mongoose";

const videoSchema = new Schema(
  {
    videoID: {
      type: String,
      require: [true, "Video ID is required to create video"],
    },
    title: {
      type: String,
      require: [true, "Title is required to create a video"],
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    viewsCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export const videoModel = model("Video", videoSchema);
