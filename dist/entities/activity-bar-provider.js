"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivityBarProvider = void 0;
var vscode_1 = require("vscode");
var ActivityBarProvider = /** @class */ (function () {
    function ActivityBarProvider(outline) {
        this.outline = outline;
    }
    ActivityBarProvider.prototype.getTreeItem = function (item) {
        if (item && item.children) {
            var state = item.collapsibleState ?
                item.collapsibleState : vscode_1.TreeItemCollapsibleState.Collapsed;
            return new vscode_1.TreeItem(item.label, state);
        }
        return item;
    };
    ActivityBarProvider.prototype.getChildren = function (element) {
        if (element) {
            return element.label ? Promise.resolve(element.children) : Promise.resolve(element);
        }
        else {
            return Promise.resolve(this.outline);
        }
    };
    ActivityBarProvider.prototype.create = function (viewId) {
        vscode_1.window.registerTreeDataProvider(viewId, new ActivityBarProvider(this.outline));
        vscode_1.window.createTreeView(viewId, {
            treeDataProvider: new ActivityBarProvider(this.outline),
        });
    };
    return ActivityBarProvider;
}());
exports.ActivityBarProvider = ActivityBarProvider;
//# sourceMappingURL=activity-bar-provider.js.map