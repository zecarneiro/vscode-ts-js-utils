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
exports.Extensions = void 0;
var vscode_1 = require("vscode");
var processor_utils_1 = require("../processor-utils");
var node_ts_js_utils_1 = require("node-ts-js-utils");
var Extensions = /** @class */ (function (_super) {
    __extends(Extensions, _super);
    function Extensions(console, sqlite, context) {
        var _this = _super.call(this) || this;
        _this.console = console;
        _this.sqlite = sqlite;
        _this.context = context;
        _this.tableNameDbVs = 'ItemTable';
        _this.tableKeyDisabledExtensions = 'extensionsIdentifiers/disabled';
        _this.extensionsDisabledEnabledMsg = 'Extensions was disabled/enabled. Please Restart VSCode!!!';
        /* -------------------------------------------------------------------------- */
        /*                                   PRIVATE                                  */
        /* -------------------------------------------------------------------------- */
        _this.minRefreshTime = 5;
        _this._disabled = [];
        _this._refreshTime = _this.minRefreshTime; // in minutes
        return _this;
    }
    Object.defineProperty(Extensions.prototype, "dbFile", {
        /* -------------------------------------------------------------------------- */
        /*                                   PUBLIC                                   */
        /* -------------------------------------------------------------------------- */
        get: function () {
            var stateStorageFile = 'Code/User/globalStorage/state.vscdb';
            if (this.fileSystem.isLinux) {
                stateStorageFile = this.fileSystem.systemInfo.homeDir + '/.config/' + stateStorageFile;
            }
            else if (this.fileSystem.isWindows) {
                stateStorageFile = this.fileSystem.systemInfo.homeDir + '\\AppData\\Roaming\\' + stateStorageFile;
            }
            else {
                stateStorageFile = '';
            }
            return this.fileSystem.resolvePath(stateStorageFile);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Extensions.prototype, "disabled", {
        get: function () {
            var checkTimeSec = this.refreshTime * 60; // Convert min to seconds
            if (!this.loadTime || this.functions.isTimePassed(this.loadTime, checkTimeSec)) {
                this.refreshDisabledData();
                this.loadTime = new Date();
            }
            return this.functions.copyJsonData(this._disabled);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Extensions.prototype, "refreshTime", {
        get: function () {
            return this._refreshTime < this.minRefreshTime ? this.minRefreshTime : this._refreshTime;
        },
        /**
         * Refresh of 2 in 2 min by default
         * @param  {number} valMinutes
         */
        set: function (valMinutes) {
            if (!valMinutes || valMinutes < this.minRefreshTime) {
                this._refreshTime = this.minRefreshTime;
            }
            else {
                this._refreshTime = valMinutes;
            }
        },
        enumerable: false,
        configurable: true
    });
    Extensions.prototype.isDisabled = function (id) {
        var _this = this;
        var upperId = this.functions.toLowerUpperCase(id);
        return this.disabled.findIndex(function (val) { return _this.functions.toLowerUpperCase(val.id) === upperId; }) !== -1;
    };
    Extensions.prototype.getDisabledExtension = function (id) {
        for (var _i = 0, _a = this.disabled; _i < _a.length; _i++) {
            var disabled = _a[_i];
            if (disabled.id.toLowerCase() === id.toLowerCase()) {
                return disabled;
            }
        }
        return undefined;
    };
    Extensions.prototype.enableAll = function () {
        var response = new node_ts_js_utils_1.Response();
        if (this.disabled.length > 0) {
            var query = "DELETE FROM ".concat(this.tableNameDbVs, " WHERE key = '").concat(this.tableKeyDisabledExtensions, "'");
            var result = this.sqlite.exec(query, { file: this.dbFile });
            if (result.hasError) {
                response.error = result.error;
            }
        }
        response.data = true;
        return response;
    };
    Extensions.prototype.disable = function (ids) {
        var _this = this;
        if (!ids || ids.length <= 0) {
            return this.enableAll();
        }
        var toDisable = [];
        ids.forEach(function (id) {
            if (_this.isDisabled(id)) {
                toDisable.push(_this.getDisabledExtension(id));
            }
            else {
                var extensionInfo = _this.getExtensionInfo(id);
                if (extensionInfo) {
                    toDisable.push({ id: id, uuid: extensionInfo.uuid });
                }
            }
        });
        var response = new node_ts_js_utils_1.Response();
        if (toDisable.length > 0) {
            var query = "INSERT OR REPLACE INTO ".concat(this.tableNameDbVs, " VALUES (\"").concat(this.tableKeyDisabledExtensions, "\", '").concat(this.functions.objectToString(toDisable, 0, true), "')");
            var result = this.sqlite.exec(query, { file: this.dbFile });
            if (result.hasError) {
                response.error = response.error;
            }
            else {
                response.data = true;
            }
        }
        else {
            response = this.enableAll();
        }
        return response;
    };
    Extensions.prototype.getPath = function () {
        return this.context.extensionPath ? this.context.extensionPath : '';
    };
    Extensions.prototype.isInstalled = function (id) {
        return this.isDisabled(id) || vscode_1.extensions.getExtension(id) ? true : false;
    };
    Extensions.prototype.installUninstallExtensions = function (ids, isInstall) {
        return __awaiter(this, void 0, void 0, function () {
            var commandExt, _i, ids_1, id, message;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        commandExt = isInstall ? 'code --install-extension {0}' : 'code --uninstall-extension {0}';
                        ids = ids ? ids : [];
                        _i = 0, ids_1 = ids;
                        _a.label = 1;
                    case 1:
                        if (!(_i < ids_1.length)) return [3 /*break*/, 4];
                        id = ids_1[_i];
                        if (!((isInstall && !this.isInstalled(id)) || (!isInstall && this.isInstalled(id)))) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.console.exec({
                                cmd: this.functions.stringReplaceAll(commandExt, [{ search: '{0}', toReplace: id }]),
                                isThrow: false,
                            })];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4:
                        message = isInstall ? 'Install extensions' : 'Uninstall extensions';
                        this.logger.emptyLine();
                        this.logger.info(message + ', done. Please reload VSCode.');
                        return [2 /*return*/];
                }
            });
        });
    };
    Extensions.prototype.getExtension = function (extensionId) {
        return this.functions.copyJsonData(vscode_1.extensions.getExtension(extensionId));
    };
    Extensions.prototype.getExtensionInfo = function (extensionId) {
        var info = this.getExtension(extensionId) ?
            this.getExtension(extensionId).packageJSON :
            undefined;
        if (info) {
            info = this.functions.convert(info);
            info.configData = info.name ? vscode_1.workspace.getConfiguration(info.name) : undefined;
        }
        return this.functions.copyJsonData(info);
    };
    Extensions.prototype.getExtensionSettings = function (extensionId, section) {
        var packageJson = this.getExtension(extensionId) ? this.getExtension(extensionId).packageJSON : undefined;
        if (packageJson['name'] && vscode_1.workspace.getConfiguration(packageJson['name'])) {
            return vscode_1.workspace.getConfiguration(packageJson['name']).get(section ? section : '');
        }
        return undefined;
    };
    Extensions.prototype.refreshDisabledData = function () {
        var query = "SELECT * FROM ".concat(this.tableNameDbVs, " WHERE key = '").concat(this.tableKeyDisabledExtensions, "'");
        var result = this.sqlite.exec(query, { file: this.dbFile });
        if (result.hasError) {
            return new node_ts_js_utils_1.ResponseBuilder().withData(this._disabled).withError(result.error).build();
        }
        this._disabled = result.data && result.data.length > 0 ? this.functions.stringToObject(result.data[0].value) : this._disabled;
    };
    return Extensions;
}(processor_utils_1.ProcessorUtils));
exports.Extensions = Extensions;
//# sourceMappingURL=extensions.js.map