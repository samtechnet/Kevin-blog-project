import { Schema, model } from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";
const BlogPostSchema = new Schema(
    {
        category: {
            type: Schema.Types.ObjectId,
            ref: "Category",
        },
        title: {
            type: String,
            required: true,
        },
        imageUrl: {
            type: String,
            required: true,
        },
        slug: {
            type: String,
            required: true,
            unique: true,
        },
        body: {
            type: String,
            required: true,
        },
        viewsCount: {
            type: Number,
            default: 0,
        },
        comments: {
            type: Schema.Types.ObjectId,
            ref: "Comment",
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        
    },
    { timestamps: true }
);
BlogPostSchema.plugin(mongooseUniqueValidator);
export default model("Blogpost", BlogPostSchema);