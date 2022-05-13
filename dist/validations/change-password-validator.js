"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.changePasswordValidate = exports.changePasswordValidationRules = void 0;
var express_validator_1 = require("express-validator");
var changePasswordValidationRules = function () {
    return [
        (0, express_validator_1.check)("newPassword")
            .trim()
            .notEmpty().withMessage('Password can not be empty')
            .isLength({ min: 6, max: 16 })
            .withMessage("Password must be between 6 and 16 characters")
    ];
};
exports.changePasswordValidationRules = changePasswordValidationRules;
var changePasswordValidate = function (req, res, next) {
    var errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return next;
    }
    ;
    var resultErrors = [];
    errors.array().map(function (err) {
        var _a;
        return resultErrors.push((_a = {}, _a[err.param] = err.msg, _a));
    });
    resultErrors.push({ message: "Action unsuccessful" });
    resultErrors.push({ success: false });
    var errorObject = Object.assign.apply(Object, __spreadArray([{}], resultErrors, false));
    return res.status(422).json(errorObject);
};
exports.changePasswordValidate = changePasswordValidate;
