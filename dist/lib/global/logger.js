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
exports.Logger = void 0;
var node_ts_js_utils_1 = require("node-ts-js-utils");
var vscode_1 = require("vscode");
var Logger = /** @class */ (function (_super) {
    __extends(Logger, _super);
    function Logger() {
        var _this = _super.call(this) || this;
        /* -------------------------------------------------------------------------- */
        /*                                   PRIVATE                                  */
        /* -------------------------------------------------------------------------- */
        _this.outputChannelKey = 'outputChannel';
        return _this;
    }
    Object.defineProperty(Logger.prototype, "logger", {
        /* -------------------------------------------------------------------------- */
        /*                                  PROTECTED                                 */
        /* -------------------------------------------------------------------------- */
        get: function () {
            if (!this._logger) {
                this._logger = this.functions.getGlobalData(this.outputChannelKey, true);
                if (!this._logger) {
                    this._logger = vscode_1.window.createOutputChannel(global.nodeTsJsUtils.projectName);
                    this.functions.setGlobalData(this.outputChannelKey, this._logger);
                }
            }
            return this._logger;
        },
        enumerable: false,
        configurable: true
    });
    Logger.prototype.printData = function (type, data, printType) {
        if (data) {
            var finalData = "".concat(this.processPrefix(type)).concat(this.functions.objectToString(data));
            var logger = this.getLogger();
            logger.show(true);
            if (printType === node_ts_js_utils_1.EPrintType.sameLine) {
                logger.append(finalData);
            }
            else {
                if (printType === node_ts_js_utils_1.EPrintType.carriageReturn) {
                    this.clearLine();
                }
                logger.appendLine(finalData);
            }
        }
    };
    /* -------------------------------------------------------------------------- */
    /*                                   PUBLIC                                   */
    /* -------------------------------------------------------------------------- */
    Logger.prototype.emptyLine = function (numLine) {
        if (numLine === void 0) { numLine = 1; }
        for (var i = 0; i < numLine; ++i) {
            this.getLogger().appendLine('');
        }
    };
    Logger.prototype.clearScreen = function () {
        this.getLogger().clear();
    };
    Logger.prototype.clearLine = function () {
        this.clearScreen();
    };
    return Logger;
}(node_ts_js_utils_1.Logger));
exports.Logger = Logger;
//# sourceMappingURL=logger.js.map