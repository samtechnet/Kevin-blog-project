"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var UserSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    role: {
        type: String,
        "default": "user",
        "enum": ["user", "admin"]
    },
    password: {
        type: String,
        required: true
    },
    verificationCode: {
        type: Number
    },
    isEmailVerified: {
        type: Boolean,
        defualt: false
    },
    passwordResetCode: {
        type: String
    }
}, { timestamps: true });
exports["default"] = (0, mongoose_1.model)("User", UserSchema);
