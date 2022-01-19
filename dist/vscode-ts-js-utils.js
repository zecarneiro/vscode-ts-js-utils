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
Object.defineProperty(exports, "__esModule", { value: true });
exports.VscodeTsJsUtils = void 0;
var logger_1 = require("./lib/global/logger");
var console_1 = require("./lib/console/console");
var extensions_1 = require("./lib/extensions");
var file_system_1 = require("./lib/global/file-system");
var window_1 = require("./lib/window");
var node_ts_js_utils_1 = require("node-ts-js-utils");
var VscodeTsJsUtils = /** @class */ (function (_super) {
    __extends(VscodeTsJsUtils, _super);
    function VscodeTsJsUtils(projectName, context) {
        var _this = _super.call(this, projectName) || this;
        _this.context = context;
        return _this;
    }
    Object.defineProperty(VscodeTsJsUtils.prototype, "globalData", {
        get: function () {
            return {
                projectName: this.projectName,
                fileSystem: new file_system_1.FileSystem(),
                functions: new node_ts_js_utils_1.Functions(),
                logger: new logger_1.Logger(),
                others: [],
            };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(VscodeTsJsUtils.prototype, "console", {
        get: function () {
            if (!this._console) {
                this._console = new console_1.Console(this.context);
            }
            return this._console;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(VscodeTsJsUtils.prototype, "fileSystem", {
        get: function () {
            if (!this._fileSystem) {
                this._fileSystem = new file_system_1.FileSystem();
            }
            return this._fileSystem;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(VscodeTsJsUtils.prototype, "logger", {
        get: function () {
            if (!this._logger) {
                this._logger = new logger_1.Logger();
            }
            return this._logger;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(VscodeTsJsUtils.prototype, "extensions", {
        get: function () {
            if (!this._extensions) {
                this._extensions = new extensions_1.Extensions(this.console, this.sqlite, this.context);
            }
            return this._extensions;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(VscodeTsJsUtils.prototype, "windows", {
        get: function () {
            if (!this._windows) {
                this._windows = new window_1.Windows(this.console);
            }
            return this._windows;
        },
        enumerable: false,
        configurable: true
    });
    return VscodeTsJsUtils;
}(node_ts_js_utils_1.NodeTsJsUtils));
exports.VscodeTsJsUtils = VscodeTsJsUtils;
//# sourceMappingURL=vscode-ts-js-utils.js.map