import { FileSystem as FileSystemNode, IFileInfo, Response } from 'node-ts-js-utils';
import { Uri, WorkspaceFolder } from 'vscode';
export declare class FileSystem extends FileSystemNode {
    constructor();
    resolvePath(strPath: string): string;
    getUriFile(file: string): Uri;
    getActiveTextEditorFile(): Response<IFileInfo>;
    getWorkspaceDir(name?: string): WorkspaceFolder | WorkspaceFolder[] | undefined;
    getWorkspaceRootPath(): string;
}
