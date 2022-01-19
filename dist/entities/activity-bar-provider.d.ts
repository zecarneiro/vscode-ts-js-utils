import { IActivityBarProvider } from './../interface/Iactivity-bar-provider-bar';
import { TreeDataProvider, TreeItem } from 'vscode';
export declare class ActivityBarProvider implements TreeDataProvider<any> {
    private outline;
    constructor(outline: IActivityBarProvider[] | TreeItem[]);
    getTreeItem(item: any): TreeItem | Thenable<TreeItem>;
    getChildren(element?: any): Thenable<IActivityBarProvider[] | TreeItem[]>;
    create(viewId: string): void;
}
