import { Schema, model } from "mongoose";

const CommentSchema = new Schema(
    {
        body: {
            type: String,
            required: true,
        },
        story: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        
    },
    { timestamps: true }
);

export default model("Comment", CommentSchema);