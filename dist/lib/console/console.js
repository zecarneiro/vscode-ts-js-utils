"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Console = void 0;
var shell_1 = require("./shell");
var vscode_1 = require("vscode");
var node_ts_js_utils_1 = require("node-ts-js-utils");
var Console = /** @class */ (function (_super) {
    __extends(Console, _super);
    function Console(context) {
        var _this = _super.call(this) || this;
        _this.context = context;
        return _this;
    }
    Object.defineProperty(Console.prototype, "shellVs", {
        /* -------------------------------------------------------------------------- */
        /*                                   PUBLIC                                   */
        /* -------------------------------------------------------------------------- */
        get: function () {
            if (!this._shellVs) {
                this._shellVs = new shell_1.Shell(this);
            }
            return this._shellVs;
        },
        enumerable: false,
        configurable: true
    });
    Console.prototype.exec = function (command) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _super.prototype.exec.call(this, command)];
                    case 1:
                        response = _a.sent();
                        if (command.verbose) {
                            response.print();
                        }
                        return [2 /*return*/, response];
                }
            });
        });
    };
    Console.prototype.execTerminal = function (command) {
        var _a, _b, _c;
        var cmd = this.getCommandWithArgs(command);
        var terminal = this.shellVs.getShell(command.shellType);
        if (command.cwd) {
            (_a = terminal.term) === null || _a === void 0 ? void 0 : _a.sendText("cd \"".concat(command.cwd, "\""));
        }
        (_b = terminal.term) === null || _b === void 0 ? void 0 : _b.show(true);
        (_c = terminal.term) === null || _c === void 0 ? void 0 : _c.sendText(cmd);
    };
    Console.prototype.createTerminal = function (options) {
        options['shellPath'] = !options.shellPath ? this.shell.getShell() : options.shellPath;
        options['name'] = this.projectName + ': ' + (options === null || options === void 0 ? void 0 : options.name);
        var terminal = this.getActiveTerminal(options.name);
        if (!terminal) {
            terminal = vscode_1.window.createTerminal(options);
        }
        return terminal;
    };
    Console.prototype.registerCommand = function (data) {
        var _this = this;
        data.forEach(function (value) {
            var _a, _b;
            if (value.callback) {
                var register = vscode_1.commands.registerCommand(value.command, (_a = value.callback) === null || _a === void 0 ? void 0 : _a.caller, (_b = value.callback) === null || _b === void 0 ? void 0 : _b.thisArg);
                _this.context.subscriptions.push(register);
            }
        });
    };
    Console.prototype.getActiveTerminal = function (name) {
        return vscode_1.window.terminals.find(function (t) { return t.name === name; });
    };
    Console.prototype.execCommand = function (command) {
        var rest = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            rest[_i - 1] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, vscode_1.commands.executeCommand(command, rest)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Console.prototype.closeTerminal = function (processId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.execCommand('workbench.action.terminal.kill', processId)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return Console;
}(node_ts_js_utils_1.Console));
exports.Console = Console;
//# sourceMappingURL=console.js.map