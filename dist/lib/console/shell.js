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
exports.Shell = void 0;
var vscode_1 = require("vscode");
var processor_utils_1 = require("../../processor-utils");
var node_ts_js_utils_1 = require("node-ts-js-utils");
var Shell = /** @class */ (function (_super) {
    __extends(Shell, _super);
    function Shell(console) {
        var _this = _super.call(this) || this;
        _this.console = console;
        _this.onCloseTerminal();
        return _this;
    }
    Object.defineProperty(Shell.prototype, "bash", {
        get: function () {
            var name = "".concat(this.projectName, " - Bash");
            this._bash = { name: name, term: this.console.getActiveTerminal(name) };
            if (!this._bash.term && this.existShell(node_ts_js_utils_1.EShellType.bash)) {
                this._bash.term = vscode_1.window.createTerminal(name, this.console.shell.getShell(node_ts_js_utils_1.EShellType.bash));
            }
            return this._bash;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Shell.prototype, "powershell", {
        get: function () {
            var name = "".concat(this.projectName, " - Powershell");
            this._powershell = { name: name, term: this.console.getActiveTerminal(name) };
            if (!this._powershell.term && this.existShell(node_ts_js_utils_1.EShellType.powershell)) {
                this._powershell.term = vscode_1.window.createTerminal(name, this.console.shell.getShell(node_ts_js_utils_1.EShellType.powershell));
            }
            return this._powershell;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Shell.prototype, "terminalOsx", {
        get: function () {
            var name = "".concat(this.projectName, " - OSX");
            this._osxTerminal = { name: name, term: this.console.getActiveTerminal(name) };
            if (!this._osxTerminal.term && this.existShell(node_ts_js_utils_1.EShellType.terminalOsx)) {
                this._osxTerminal.term = vscode_1.window.createTerminal(name, this.console.shell.getShell(node_ts_js_utils_1.EShellType.terminalOsx));
            }
            return this._osxTerminal;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Shell.prototype, "systemVs", {
        get: function () {
            if (this.fileSystem.isLinux) {
                return this.bash;
            }
            else if (this.fileSystem.isWindows) {
                return this.powershell;
            }
            else if (this.fileSystem.isOsx) {
                return this.terminalOsx;
            }
            return undefined;
        },
        enumerable: false,
        configurable: true
    });
    Shell.prototype.onCloseTerminal = function () {
        var _this = this;
        vscode_1.window.onDidCloseTerminal(function (term) {
            if (term.name === _this.bash.name) {
                _this.bash.term = undefined;
            }
            else if (term.name === _this.powershell.name) {
                _this.powershell.term = undefined;
            }
            else if (term.name === _this.terminalOsx.name) {
                _this.terminalOsx.term = undefined;
            }
            if (term.name === _this.systemVs.name) {
                _this.systemVs.term = undefined;
            }
        });
    };
    Shell.prototype.getShell = function (type) {
        switch (type) {
            case node_ts_js_utils_1.EShellType.bash:
                return this.bash;
            case node_ts_js_utils_1.EShellType.powershell:
                return this.powershell;
            case node_ts_js_utils_1.EShellType.terminalOsx:
                return this.terminalOsx;
        }
        return this.systemVs;
    };
    Shell.prototype.existShell = function (shellType) {
        return this.console.shell.existShell(shellType);
    };
    return Shell;
}(processor_utils_1.ProcessorUtils));
exports.Shell = Shell;
//# sourceMappingURL=shell.js.map