"use strict";
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
var express_1 = __importDefault(require("express"));
var dotenv_1 = __importDefault(require("dotenv"));
var body_parser_1 = __importDefault(require("body-parser"));
var cors_1 = __importDefault(require("cors"));
var express_paginate_1 = __importDefault(require("express-paginate"));
var passport_1 = __importDefault(require("passport"));
var mongoose_1 = require("mongoose");
var mongoose_2 = __importDefault(require("mongoose"));
var index_1 = __importDefault(require("./routes/index"));
mongoose_2["default"].set("debug", true);
mongoose_2["default"].Promise = global.Promise;
dotenv_1["default"].config();
var limit = Number(process.env.LIMIT);
var max_limit = Number(process.env.MAX_LIMIT);
var dbUrl = String(process.env.MONGO_DB);
var PORT = process.env.PORT;
var DB = process.env.MONGO_DB;
var app = (0, express_1["default"])();
app.use(body_parser_1["default"].json());
app.use((0, cors_1["default"])());
app.use(express_1["default"].urlencoded({ extended: false }));
app.use(express_1["default"].json());
app.use(passport_1["default"].initialize());
require("./middleware/passport-middleware.ts")(passport_1["default"]);
app.use(express_paginate_1["default"].middleware(limit, max_limit));
app.use(index_1["default"]);
app.get("/kevin", function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            res.send("This is server");
            return [2 /*return*/];
        });
    });
});
var runApp = function () { return __awaiter(void 0, void 0, void 0, function () {
    var error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, (0, mongoose_1.connect)(dbUrl)];
            case 1:
                _a.sent();
                console.log("successfully connected to database ".concat(DB));
                app.listen(PORT, function () {
                    console.log("Server started successfulyy on PORT ".concat(PORT));
                });
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                console.log(error_1);
                runApp();
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
runApp();
