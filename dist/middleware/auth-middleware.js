"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.ensureAuthorized = exports.ensureAuthenticated = void 0;
var passport_1 = __importDefault(require("passport"));
var ensureAuthenticated = passport_1["default"].authenticate("jwt", { session: false });
exports.ensureAuthenticated = ensureAuthenticated;
var ensureAuthorized = function (roles) { return function (req, res, next) {
    if (roles.includes(req.user.roles)) {
        return next();
    }
    return res.status(401).json({
        message: "Unauthorized",
        success: false
    });
}; };
exports.ensureAuthorized = ensureAuthorized;
