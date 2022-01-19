import { Logger } from './lib/global/logger';
import { ExtensionContext } from 'vscode';
import { Console } from './lib/console/console';
import { Extensions } from './lib/extensions';
import { FileSystem } from './lib/global/file-system';
import { Windows } from './lib/window';
import { Functions, INodeTsJsUtilsGlobal, NodeTsJsUtils } from 'node-ts-js-utils';

export class VscodeTsJsUtils extends NodeTsJsUtils {
  constructor(
    projectName: string,
    private context: ExtensionContext,
  ) {
    super(projectName);
  }

  protected get globalData(): INodeTsJsUtilsGlobal {
    return {
      projectName: this.projectName,
      fileSystem: new FileSystem(),
      functions: new Functions(),
      logger: new Logger(),
      others: [],
    };
  }

  protected _console: Console;
  get console(): Console {
    if (!this._console) {
      this._console = new Console(this.context);
    }
    return this._console;
  }

  private _fileSystem: FileSystem;
  get fileSystem(): FileSystem {
    if (!this._fileSystem) {
      this._fileSystem = new FileSystem();
    }
    return this._fileSystem;
  }

  private _logger: Logger;
  get logger(): Logger {
    if (!this._logger) {
      this._logger = new Logger();
    }
    return this._logger;
  }

  private _extensions: Extensions;
  get extensions(): Extensions {
    if (!this._extensions) {
      this._extensions = new Extensions(this.console, this.sqlite, this.context);
    }
    return this._extensions;
  }

  private _windows: Windows;
  get windows(): Windows {
    if (!this._windows) {
      this._windows = new Windows(this.console);
    }
    return this._windows;
  }
}
