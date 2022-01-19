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
exports.Windows = void 0;
var vscode_1 = require("vscode");
var activity_bar_provider_1 = require("../entities/activity-bar-provider");
var processor_utils_1 = require("../processor-utils");
var Windows = /** @class */ (function (_super) {
    __extends(Windows, _super);
    function Windows(console) {
        var _this = _super.call(this) || this;
        _this.console = console;
        return _this;
    }
    Windows.prototype.createActivityBar = function (data, id) {
        var activityBarData = [];
        var vsCmd = [];
        var treeItem = function (dataTreeItem) {
            var newDataTree = [];
            if (dataTreeItem) {
                dataTreeItem.forEach(function (val) {
                    newDataTree.push(val.treeItem);
                    vsCmd.push({
                        callback: {
                            caller: val.callback.caller,
                            thisArg: val.callback.thisArg,
                        },
                        command: val.treeItem.command ? val.treeItem.command.command : '',
                    });
                });
            }
            return newDataTree;
        };
        var createActivityBar = function (data, id) {
            var activityBar = new activity_bar_provider_1.ActivityBarProvider(data);
            activityBar.create(id);
        };
        for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
            var tree = data_1[_i];
            if (tree.hasChildren) {
                var dataWithChildren = this.functions.convert(tree);
                activityBarData.push({
                    label: dataWithChildren.label,
                    children: treeItem(dataWithChildren.children),
                });
            }
            else {
                var dataWithoutChildren = this.functions.convert(tree);
                activityBarData = activityBarData.concat(treeItem([dataWithoutChildren]));
            }
        }
        createActivityBar(activityBarData, id);
        this.console.registerCommand(vsCmd);
    };
    Windows.prototype.createInputBoxVs = function (inputBoxOptions) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        inputBoxOptions.ignoreFocusOut = false;
                        return [4 /*yield*/, vscode_1.window.showInputBox(inputBoxOptions)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Windows.prototype.createStatusBar = function (options) {
        var statusbar = vscode_1.window.createStatusBarItem(vscode_1.StatusBarAlignment.Right, 0);
        statusbar.text = options.text;
        statusbar.command = this.functions.convert(options.command);
        statusbar.tooltip = options.tooltip;
        statusbar.show();
    };
    Windows.prototype.createQuickPick = function (items, options, isString) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!isString) return [3 /*break*/, 2];
                        return [4 /*yield*/, vscode_1.window.showQuickPick(items, options)];
                    case 1:
                        result = _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, vscode_1.window.showQuickPick(items, options)];
                    case 3:
                        result = _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/, this.functions.convert(result)];
                }
            });
        });
    };
    Windows.prototype.showOpenDialog = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, vscode_1.window.showOpenDialog(options)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, !options.canSelectMany && result && result[0] ? this.functions.convert(result[0]) : this.functions.convert(result)];
                }
            });
        });
    };
    Windows.prototype.showWebViewHTML = function (body, title, css, language) {
        var key = 'webview';
        var webViewPanel = this.functions.getGlobalData(key, true);
        if (!webViewPanel) {
            webViewPanel = vscode_1.window.createWebviewPanel('WebView', this.projectName, vscode_1.ViewColumn.One, {});
            this.functions.setGlobalData(key, webViewPanel);
        }
        var data = "<!DOCTYPE html>\n    <html lang=\"".concat(language ? language : 'en', "\">\n    <style>\n      title-body {\n        align: center;\n      }\n      ").concat(css ? css : '', "\n    </style>\n    <head>\n      <meta charset=\"UTF-8\">\n      <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n      <title>").concat(this.projectName, "</title>\n    </head>\n    <body>\n      <h1 class=\"title-body\">").concat(title, "</h1>\n      ").concat(body, "\n    </body>\n    </html>");
        webViewPanel.webview.html = data;
    };
    Windows.prototype.showTextDocument = function (file) {
        var fileSystem = this.functions.convert(this.fileSystem);
        vscode_1.workspace.openTextDocument(fileSystem.getUriFile(file)).then(function (doc) {
            vscode_1.window.showTextDocument(doc);
        });
    };
    return Windows;
}(processor_utils_1.ProcessorUtils));
exports.Windows = Windows;
//# sourceMappingURL=window.js.map