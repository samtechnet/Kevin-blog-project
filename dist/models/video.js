"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var VideoSchema = new mongoose_1.Schema({
    videoId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    createdBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User"
    },
    viewsCount: {
        type: Number,
        "default": 0
    }
}, { timestamps: true });
exports["default"] = (0, mongoose_1.model)("Video", VideoSchema);
