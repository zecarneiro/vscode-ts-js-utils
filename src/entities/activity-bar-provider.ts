import { IActivityBarProvider } from './../interface/Iactivity-bar-provider-bar';
import { TreeDataProvider, TreeItem, TreeItemCollapsibleState, window } from 'vscode';

export class ActivityBarProvider implements TreeDataProvider<any> {
  constructor(
        private outline: IActivityBarProvider[] | TreeItem[],
  ) { }

  getTreeItem(item: any): TreeItem | Thenable<TreeItem> {
    if (item && item.children) {
      const state: TreeItemCollapsibleState = item.collapsibleState ?
                item.collapsibleState : TreeItemCollapsibleState.Collapsed;
      return new TreeItem(item.label, state);
    }
    return item;
  }
  getChildren(element?: any): Thenable<IActivityBarProvider[] | TreeItem[]> {
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
