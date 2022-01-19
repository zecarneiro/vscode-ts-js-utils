import { WorkspaceConfiguration } from 'vscode';
interface IAuthor {
    name: string;
}
interface IVsLocation {
    fsPath: string;
    path: string;
    scheme: string;
}
export interface IExtensionInfo {
    author: IAuthor;
    publisher: string;
    name: string;
    displayName: string;
    version: string;
    main: string;
    id: string;
    configData: WorkspaceConfiguration;
    uuid: any;
    extensionLocation: IVsLocation;
}
export {};
