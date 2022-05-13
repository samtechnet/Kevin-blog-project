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
exports.changePassword = exports.resetPassword = exports.forgotPassword = exports.verify = exports.register = exports.login = void 0;
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var user_1 = __importDefault(require("../models/user"));
var node_crypto_1 = __importDefault(require("node:crypto"));
var saltRounds = Number(process.env.SALT_ROUNDS);
var pepper = String(process.env.BCRYPT_PASSWORD);
var jwsToken = String(process.env.JWT_SECRET);
var register = function (data, role, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userTaken, hashedPassword, code, newUser, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                return [4 /*yield*/, validateEmail(data.email)];
            case 1:
                userTaken = _a.sent();
                if (userTaken) {
                    return [2 /*return*/, res.status(400).json({
                            email: "Email is already taken",
                            message: "Registration failure",
                            success: false
                        })];
                }
                return [4 /*yield*/, bcryptjs_1["default"].hash(data.password + pepper, saltRounds)];
            case 2:
                hashedPassword = _a.sent();
                code = node_crypto_1["default"].randomInt(100000, 1000000);
                newUser = new user_1["default"](__assign(__assign({}, data), { password: hashedPassword, verificationCode: code, role: role }));
                return [4 /*yield*/, newUser.save()];
            case 3:
                _a.sent();
                return [2 /*return*/, res.status(201).json({
                        message: "Account successfully created",
                        sucess: true
                    })];
            case 4:
                error_1 = _a.sent();
                return [2 /*return*/, res.status(500).json({
                        message: error_1.message,
                        success: false
                    })];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.register = register;
var login = function (data, res) { return __awaiter(void 0, void 0, void 0, function () {
    var email, password, user, isMatch, token, profile, result, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                email = data.email, password = data.password;
                return [4 /*yield*/, user_1["default"].findOne({ email: email })];
            case 1:
                user = _a.sent();
                if (!user) {
                    res.status(404).json({
                        message: "Email login attempt",
                        email: "Incorrect email",
                        success: false
                    });
                }
                return [4 /*yield*/, bcryptjs_1["default"].compare(password, user.password)];
            case 2:
                isMatch = _a.sent();
                if (isMatch) {
                    token = jsonwebtoken_1["default"].sign({
                        user_id: user._id,
                        role: user.role,
                        email: user.email,
                        name: user.name
                    }, jwsToken, {
                        expiresIn: "7 days"
                    });
                    profile = {
                        email: user.email,
                        role: user.role,
                        name: user.name
                    };
                    result = {
                        user: profile,
                        token: token,
                        expiresIn: 168
                    };
                    return [2 /*return*/, res.status(200).json(__assign(__assign({}, result), { message: "Login success", success: true }))];
                }
                else {
                    return [2 /*return*/, res.status(403).json({
                            message: "Failed login attempt",
                            email: "Incorrect password",
                            success: false
                        })];
                }
                return [3 /*break*/, 4];
            case 3:
                error_2 = _a.sent();
                return [2 /*return*/, res.status(500).json({
                        message: error_2.message,
                        success: false
                    })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.login = login;
var verify = function (data, res) { return __awaiter(void 0, void 0, void 0, function () {
    var code, user, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                code = data.code;
                return [4 /*yield*/, user_1["default"].findOne({ verificationCode: code })];
            case 1:
                user = _a.sent();
                if (!user) {
                    return [2 /*return*/, res.status(404).json({
                            message: "Invalid code",
                            success: false
                        })];
                }
                else if (user.isEmailVerified) {
                    return [2 /*return*/, res.status(404).json({
                            message: "Email already verified",
                            success: false
                        })];
                }
                return [4 /*yield*/, user.update({ isEmailVerified: true })];
            case 2:
                _a.sent();
                return [2 /*return*/, res.status(201).json({
                        message: "Email verification success",
                        success: true
                    })];
            case 3:
                error_3 = _a.sent();
                return [2 /*return*/, res.status(500).json({
                        message: error_3.message,
                        success: false
                    })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.verify = verify;
var forgotPassword = function (data, res) { return __awaiter(void 0, void 0, void 0, function () {
    var email, user, code, passwordResetCode, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                email = data.email;
                return [4 /*yield*/, user_1["default"].findOne({ email: email })];
            case 1:
                user = _a.sent();
                if (!user) {
                    return [2 /*return*/, res.status(404).json({
                            message: "Invalid email",
                            success: false
                        })];
                }
                code = node_crypto_1["default"].randomInt(100000, 1000000);
                return [4 /*yield*/, bcryptjs_1["default"].hash(code.toString(), saltRounds)];
            case 2:
                passwordResetCode = _a.sent();
                return [4 /*yield*/, user.update({ passwordResetCode: passwordResetCode })];
            case 3:
                _a.sent();
                return [2 /*return*/, res.status(404).json({
                        message: "Verification code sent to your email",
                        success: true
                    })];
            case 4:
                error_4 = _a.sent();
                return [2 /*return*/, res.status(500).json({
                        message: error_4.message,
                        success: false
                    })];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.forgotPassword = forgotPassword;
var resetPassword = function (data, res) { return __awaiter(void 0, void 0, void 0, function () {
    var email, code, newPassword, user, isMatch, hashedPassword, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 7, , 8]);
                email = data.email, code = data.code, newPassword = data.newPassword;
                return [4 /*yield*/, user_1["default"].findOne({ email: email })];
            case 1:
                user = _a.sent();
                if (!user) {
                    return [2 /*return*/, res.status(404).json({
                            message: "Invalid email",
                            success: false
                        })];
                }
                return [4 /*yield*/, bcryptjs_1["default"].compare(code.toString(), user.resetPassword)];
            case 2:
                isMatch = _a.sent();
                if (!isMatch) return [3 /*break*/, 5];
                return [4 /*yield*/, bcryptjs_1["default"].hash(newPassword + pepper, saltRounds)];
            case 3:
                hashedPassword = _a.sent();
                return [4 /*yield*/, user.update({ password: hashedPassword }, { passwordResetCode: "" })];
            case 4:
                _a.sent();
                return [2 /*return*/, res.status(201).json({
                        message: "your password  has been successfully reset",
                        success: true
                    })];
            case 5: return [2 /*return*/, res.status(404).json({
                    message: "Invalid code",
                    success: false
                })];
            case 6: return [3 /*break*/, 8];
            case 7:
                error_5 = _a.sent();
                return [2 /*return*/, res.status(500).json({
                        message: error_5.message,
                        success: false
                    })];
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.resetPassword = resetPassword;
var changePassword = function (data, res, req) { return __awaiter(void 0, void 0, void 0, function () {
    var oldPassword, newPassword, user, isMatch, hashedPassword, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 7, , 8]);
                oldPassword = data.oldPassword, newPassword = data.newPassword;
                return [4 /*yield*/, user_1["default"].findById(req.user._id)];
            case 1:
                user = _a.sent();
                return [4 /*yield*/, bcryptjs_1["default"].compare(oldPassword, user.password)];
            case 2:
                isMatch = _a.sent();
                if (!isMatch) return [3 /*break*/, 5];
                return [4 /*yield*/, bcryptjs_1["default"].hash(newPassword + pepper, saltRounds)];
            case 3:
                hashedPassword = _a.sent();
                return [4 /*yield*/, user.update({ password: hashedPassword })];
            case 4:
                _a.sent();
                return [2 /*return*/, res.status(201).json({
                        message: "Your password has been successfully reset",
                        success: true
                    })];
            case 5: return [2 /*return*/, res.status(404).json({
                    message: "Your old password is incorrect",
                    success: false
                })];
            case 6: return [3 /*break*/, 8];
            case 7:
                error_6 = _a.sent();
                return [2 /*return*/, res.status(500).json({
                        message: error_6.message,
                        success: false
                    })];
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.changePassword = changePassword;
var validateEmail = function (email) { return __awaiter(void 0, void 0, void 0, function () {
    var user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, user_1["default"].findOne({ email: email })];
            case 1:
                user = _a.sent();
                if (user) {
                    return [2 /*return*/, true];
                }
                else {
                    return [2 /*return*/, false];
                }
                return [2 /*return*/];
        }
    });
}); };
