"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var mongoose_unique_validator_1 = __importDefault(require("mongoose-unique-validator"));
var CategorySchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true
    },
    createdBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true });
CategorySchema.plugin(mongoose_unique_validator_1["default"]);
exports["default"] = (0, mongoose_1.model)("Category", CategorySchema);
