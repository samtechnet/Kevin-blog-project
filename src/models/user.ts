import { Schema, model } from "mongoose";

const UserSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            default: "user",
            enum: ["user", "admin"],
        },
        password: {
            type: String,
            required: true,
        },
        verificationCode: {
            type: Number,
        },
        isEmailVerified: {
            type: Boolean,
            defualt: false,
        },
        passwordResetCode: {
            type: String,
        }
    },
    { timestamps: true }
);

export default model("User", UserSchema);