import { Schema, model } from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";

const CategorySchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        
    },
    { timestamps: true }
);

CategorySchema.plugin(mongooseUniqueValidator);
export default model("Category", CategorySchema);