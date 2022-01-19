import { FileSystem as FileSystemNode, IFileInfo, Response } from 'node-ts-js-utils';
import { Uri, window, workspace, WorkspaceFolder } from 'vscode';

export class FileSystem extends FileSystemNode {
  constructor() {
    super();
  }

  /* -------------------------------------------------------------------------- */
  /*                                   PUBLIC                                   */
  /* -------------------------------------------------------------------------- */
  resolvePath(strPath: string): string {
    return this.getUriFile(strPath).fsPath;
  }

  getUriFile(file: string): Uri {
    return Uri.file(file);
  }

  getActiveTextEditorFile(): Response<IFileInfo> {
    return this.getFileInfo(window.activeTextEditor?.document.fileName);
  }

  getWorkspaceDir(name?: string): WorkspaceFolder | WorkspaceFolder[] | undefined {
    const workspaceFolders = workspace.workspaceFolders;
    if (workspaceFolders) {
      const folders = this.functions.copyJsonData<WorkspaceFolder[]>(workspaceFolders);
      if (name) {
        return folders.find((x: { name: string; }) => x.name === name);
      }
      return folders;
    }
    return undefined;
  }

  getWorkspaceRootPath(): string {
    const dirs = this.getWorkspaceDir();
    if (dirs && dirs[0]) {
      return dirs[0].uri.fsPath;
    }
    return '';
  }
}
