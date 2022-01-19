import { TreeDataProvider, TreeItem, TreeItemCollapsibleState, window } from 'vscode';
import { IVsActivityBarProvider } from '../interface/vs-activity-bar-provider-bar';

export class ActivityBarProvider implements TreeDataProvider<any> {
  constructor(
        private outline: IVsActivityBarProvider[] | TreeItem[],
  ) { }

  getTreeItem(item: any): TreeItem | Thenable<TreeItem> {
    if (item && item.children) {
      const state: TreeItemCollapsibleState = item.collapsibleState ?
                item.collapsibleState : TreeItemCollapsibleState.Collapsed;
      return new TreeItem(item.label, state);
    }
    return item;
  }
  getChildren(element?: any): Thenable<IVsActivityBarProvider[] | TreeItem[]> {
    if (element) {
      return element.label ? Promise.resolve(element.children) : Promise.resolve(element);
    } else {
      return Promise.resolve(this.outline);
    }
  }
  create(viewId: string) {
    window.registerTreeDataProvider(viewId, new ActivityBarProvider(this.outline));
    window.createTreeView(viewId, {
      treeDataProvider: new ActivityBarProvider(this.outline),
    });
  }
}
