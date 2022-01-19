import { InputBoxOptions, OpenDialogOptions, QuickPickItem, QuickPickOptions, Uri } from 'vscode';
import { Console } from './console/console';
import { ITreeItemWithChildren } from '../interface/Itree-item-with-children';
import { ITreeItem } from '../interface/Itree-item';
import { IStatusBar } from '../interface/Istatus-bar';
import { ProcessorUtils } from '../processor-utils';
export declare class Windows extends ProcessorUtils {
    private console;
    constructor(console: Console);
    createActivityBar(data: ITreeItemWithChildren[] | ITreeItem[], id: string): void;
    createInputBoxVs(inputBoxOptions: InputBoxOptions): Promise<string | undefined>;
    createStatusBar(options: IStatusBar): void;
    createQuickPick<T extends QuickPickItem | QuickPickItem[] | string | string[]>(items: QuickPickItem[] | string[], options: QuickPickOptions, isString?: boolean): Promise<T | undefined>;
    showOpenDialog<T extends Uri | Uri[]>(options: OpenDialogOptions): Promise<T | undefined>;
    showWebViewHTML(body: string, title?: string, css?: string, language?: string): void;
    showTextDocument(file: string): void;
}
