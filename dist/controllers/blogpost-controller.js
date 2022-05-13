"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.getOneBySlug = exports.getTopStories = exports.getOne = exports.getAll = exports.updateOne = exports.removeOne = exports.addOne = void 0;
var blogpost_1 = __importDefault(require("../models/blogpost"));
var express_paginate_1 = __importDefault(require("express-paginate"));
var comment_1 = __importDefault(require("../models/comment"));
var addOne = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var newRecord, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                newRecord = new blogpost_1["default"](__assign(__assign({}, req.body), { createdBy: req.user.id }));
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                if (!newRecord.slug) {
                    newRecord.slug = generateSlug(newRecord.title);
                }
                return [4 /*yield*/, newRecord.save()];
            case 2:
                _a.sent();
                return [2 /*return*/, res.status(201).json({
                        message: "Item successfully created",
                        success: true
                    })];
            case 3:
                error_1 = _a.sent();
                return [2 /*return*/, res.status(500).json({
                        message: error_1.message,
                        success: false
                    })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.addOne = addOne;
var removeOne = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var deleted, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, blogpost_1["default"].findByIdAndDelete(req.params.id)];
            case 1:
                deleted = _a.sent();
                if (!deleted) {
                    return [2 /*return*/, res.status(404).json({
                            message: "Item not found",
                            success: false
                        })];
                }
                return [2 /*return*/, res.status(204).json({
                        message: "Item successfully deleted",
                        success: true
                    })];
            case 2:
                error_2 = _a.sent();
                return [2 /*return*/, res.status(500).json({
                        message: error_2.message,
                        success: false
                    })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.removeOne = removeOne;
var updateOne = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, blogpost_1["default"].findByIdAndUpdate(req.params.id, req.body)];
            case 1:
                _a.sent();
                return [2 /*return*/, res.status(201).json({
                        message: "Item successfully updated",
                        success: true
                    })];
            case 2:
                error_3 = _a.sent();
                return [2 /*return*/, res.status(500).json({
                        message: error_3.message,
                        success: false
                    })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.updateOne = updateOne;
var getAll = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var limit, _a, results, itemCount, pageCount, error_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                limit = 10;
                if (req.params.limit) {
                    limit = parseFloat(req.params.limit);
                }
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, Promise.all([
                        blogpost_1["default"].find({})
                            .populate("category", "title")
                            .sort({ createdAt: -1 })
                            .limit(req.query.limit)
                            .skip(req.skip)
                            .lean()
                            .exec(),
                        blogpost_1["default"].count({}),
                    ])];
            case 2:
                _a = _b.sent(), results = _a[0], itemCount = _a[1];
                pageCount = Math.ceil(itemCount / limit);
                return [2 /*return*/, res.status(201).json({
                        object: "List",
                        has_more: express_paginate_1["default"].hasNextPages(req)(pageCount),
                        data: results,
                        pageCount: pageCount,
                        itemCount: itemCount,
                        currentPage: req.query.page,
                        pages: express_paginate_1["default"].getArrayPages(req)(3, pageCount, req.query.page)
                    })];
            case 3:
                error_4 = _b.sent();
                return [2 /*return*/, res.status(500).json({
                        message: error_4.message,
                        success: false
                    })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getAll = getAll;
var getOne = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var item, _a, error_5;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                return [4 /*yield*/, blogpost_1["default"].findByIdAndUpdate(req.params.id, {
                        $inc: { viewsCount: 1 }
                    }).populate("category", "title")];
            case 1:
                item = _b.sent();
                if (!item) return [3 /*break*/, 3];
                _a = item;
                return [4 /*yield*/, comment_1["default"].find({ blogPost: item._id })];
            case 2:
                _a.comments = _b.sent();
                return [2 /*return*/, res.status(200).json(item)];
            case 3: return [2 /*return*/, res.status(404).json({
                    message: "Item not found",
                    success: false
                })];
            case 4:
                error_5 = _b.sent();
                return [2 /*return*/, res.status(500).json({
                        message: error_5.message,
                        success: false
                    })];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.getOne = getOne;
var getOneBySlug = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var item, _a, error_6;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                return [4 /*yield*/, blogpost_1["default"].findByIdAndUpdate(req.params.slug, {
                        $inc: { viewsCount: 1 }
                    }).populate("category", "title")];
            case 1:
                item = _b.sent();
                if (!item) return [3 /*break*/, 3];
                _a = item;
                return [4 /*yield*/, comment_1["default"].find({ blogPost: item._id })];
            case 2:
                _a.comments = _b.sent();
                return [2 /*return*/, res.status(200).json(item)];
            case 3: return [2 /*return*/, res.status(404).json({
                    message: "Item not found",
                    success: false
                })];
            case 4:
                error_6 = _b.sent();
                return [2 /*return*/, res.status(500).json({
                        message: error_6.message,
                        success: false
                    })];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.getOneBySlug = getOneBySlug;
var getTopStories = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result, error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, blogpost_1["default"].find({})
                        .populate("category", "title")
                        .sort({ viewsCount: -1 })
                        .limit(3)
                        .lean()
                        .exec()];
            case 1:
                result = _a.sent();
                return [2 /*return*/, res.status(201).json({
                        data: result
                    })];
            case 2:
                error_7 = _a.sent();
                return [2 /*return*/, res.status(500).json({
                        message: error_7.message,
                        success: false
                    })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getTopStories = getTopStories;
var generateSlug = function (title) {
    var slugText = title.toString()
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w\-]+/g, "")
        .replace(/\-\-+/g, "-")
        .replace(/^-+/, "")
        .replace(/-+$/, "");
    return slugText;
};
