import { ICallback } from 'node-ts-js-utils';
import { TreeItem } from 'vscode';
export interface ITreeItem {
    treeItem: TreeItem;
    callback?: ICallback;
    hasChildren?: boolean;
}
