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
exports.FileSystem = void 0;
var node_ts_js_utils_1 = require("node-ts-js-utils");
var vscode_1 = require("vscode");
var FileSystem = /** @class */ (function (_super) {
    __extends(FileSystem, _super);
    function FileSystem() {
        return _super.call(this) || this;
    }
    /* -------------------------------------------------------------------------- */
    /*                                   PUBLIC                                   */
    /* -------------------------------------------------------------------------- */
    FileSystem.prototype.resolvePath = function (strPath) {
        return this.getUriFile(strPath).fsPath;
    };
    FileSystem.prototype.getUriFile = function (file) {
        return vscode_1.Uri.file(file);
    };
    FileSystem.prototype.getActiveTextEditorFile = function () {
        var _a;
        return this.getFileInfo((_a = vscode_1.window.activeTextEditor) === null || _a === void 0 ? void 0 : _a.document.fileName);
    };
    FileSystem.prototype.getWorkspaceDir = function (name) {
        var workspaceFolders = vscode_1.workspace.workspaceFolders;
        if (workspaceFolders) {
            var folders = this.functions.copyJsonData(workspaceFolders);
            if (name) {
                return folders.find(function (x) { return x.name === name; });
            }
            return folders;
        }
        return undefined;
    };
    FileSystem.prototype.getWorkspaceRootPath = function () {
        var dirs = this.getWorkspaceDir();
        if (dirs && dirs[0]) {
            return dirs[0].uri.fsPath;
        }
        return '';
    };
    return FileSystem;
}(node_ts_js_utils_1.FileSystem));
exports.FileSystem = FileSystem;
//# sourceMappingURL=file-system.js.map