import { Schema, model } from "mongoose";

const VideoSchema = new Schema(
    {
        videoId: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
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

export default model("Video", VideoSchema);