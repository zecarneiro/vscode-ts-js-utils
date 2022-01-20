import { FileSystem } from './file-system';
import {
  InputBoxOptions,
  OpenDialogOptions,
  QuickPickItem,
  QuickPickOptions,
  StatusBarAlignment,
  TreeItem,
  Uri,
  ViewColumn,
  WebviewPanel,
  window,
  workspace,
} from 'vscode';
import { Console } from './console/console';
import { ITreeItemWithChildren } from '../interface/Itree-item-with-children';
import { ITreeItem } from '../interface/Itree-item';
import { IRegisterCmd } from '../interface/Iregister-cmd';
import { IActivityBarProvider } from '../interface/Iactivity-bar-provider-bar';
import { ActivityBarProvider } from '../entities/activity-bar-provider';
import { IStatusBar } from '../interface/Istatus-bar';
import { Functions } from 'node-ts-js-utils';

export class Windows {
  constructor(
    private projectName: string,
    private console: Console,
    private fileSystem: FileSystem,
  ) {}

  createActivityBar(data: ITreeItemWithChildren[] | ITreeItem[], id: string) {
    let activityBarData: any[] = [];
    const vsCmd: IRegisterCmd[] = [];
    const treeItem = (dataTreeItem: ITreeItem[] | undefined): TreeItem[] => {
      const newDataTree: TreeItem[] = [];
      if (dataTreeItem) {
        dataTreeItem.forEach((val) => {
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
    const createActivityBar = (data: IActivityBarProvider[] | TreeItem[], id: string) => {
      const activityBar = new ActivityBarProvider(data);
      activityBar.create(id);
    };
    for (const tree of data) {
      if (tree.hasChildren) {
        const dataWithChildren = Functions.convert<ITreeItemWithChildren>(tree);
        activityBarData.push({
          label: dataWithChildren.label,
          children: treeItem(dataWithChildren.children),
        });
      } else {
        const dataWithoutChildren = Functions.convert<ITreeItem>(tree);
        activityBarData = activityBarData.concat(treeItem([dataWithoutChildren]));
      }
    }
    createActivityBar(activityBarData, id);
    this.console.registerCommand(vsCmd);
  }

  async createInputBox(inputBoxOptions: InputBoxOptions): Promise<string | undefined> {
    inputBoxOptions.ignoreFocusOut = false;
    return await window.showInputBox(inputBoxOptions);
  }

  createStatusBar(options: IStatusBar) {
    const statusbar = window.createStatusBarItem(StatusBarAlignment.Right, 0);
    statusbar.text = options.text;
    statusbar.command = Functions.convert<string>(options.command);
    statusbar.tooltip = options.tooltip;
    statusbar.show();
  }

  async createQuickPick<T extends QuickPickItem|QuickPickItem[]|string|string[]>(items: QuickPickItem[]|string[], options: QuickPickOptions, isString?: boolean): Promise<T|undefined> {
    let result: QuickPickItem|QuickPickItem[]|string|string[]|undefined;
    if (isString) {
      result = await window.showQuickPick(items as string[], options);
    } else {
      result = await window.showQuickPick<QuickPickItem>(items as QuickPickItem[], options);
    }
    return Functions.convert<T>(result);
  }

  async showOpenDialog<T extends Uri|Uri[]>(options: OpenDialogOptions): Promise<T|undefined> {
    const result = await window.showOpenDialog(options);
    return !options.canSelectMany && result && result[0] ? Functions.convert<T>(result[0]) : Functions.convert<T>(result);
  }

  showWebViewHTML(body: string, title?: string, css?: string, language?: string) {
    const key = 'webview';
    let webViewPanel = Functions.getGlobalDataValue<WebviewPanel>(key);
    if (!webViewPanel) {
      webViewPanel = window.createWebviewPanel(
        'WebView',
        this.projectName,
        ViewColumn.One,
        {},
      );
      Functions.setGlobalData(key, webViewPanel);
    }
    const data: string = `<!DOCTYPE html>
    <html lang="${language ? language : 'en'}">
    <style>
      title-body {
        align: center;
      }
      ${css ? css : ''}
    </style>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${this.projectName}</title>
    </head>
    <body>
      <h1 class="title-body">${title}</h1>
      ${body}
    </body>
    </html>`;
    webViewPanel.webview.html = data;
  }

  showTextDocument(file: string) {
    workspace.openTextDocument(this.fileSystem.getUriFile(file)).then((doc) => {
      window.showTextDocument(doc);
    });
  }
}
