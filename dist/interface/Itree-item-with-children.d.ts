import { TreeItemCollapsibleState } from 'vscode';
import { ITreeItem } from './Itree-item';
export interface ITreeItemWithChildren {
    label: string;
    collapsibleState?: TreeItemCollapsibleState;
    children?: ITreeItem[];
    hasChildren?: boolean;
}
