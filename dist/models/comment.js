"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var CommentSchema = new mongoose_1.Schema({
    body: {
        type: String,
        required: true
    },
    story: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User"
    },
    createdBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true });
exports["default"] = (0, mongoose_1.model)("Comment", CommentSchema);
