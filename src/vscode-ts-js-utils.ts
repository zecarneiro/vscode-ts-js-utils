import { Sqlite } from './lib/sqlite';
import { Logger } from './lib/logger';
import { ExtensionContext } from 'vscode';
import { Console } from './lib/console/console';
import { Extensions } from './lib/extensions';
import { FileSystem } from './lib/file-system';
import { Windows } from './lib/window';
import { Java } from './lib/java';

export class VscodeTsJsUtils {
  constructor(
    private projectName: string,
    private context: ExtensionContext,
  ) {
  }

  private _console: Console;
  get console(): Console {
    if (!this._console) {
      this._console = new Console(this.projectName, this.context, this.logger, this.fileSystem);
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

  private _java: Java;
  get java(): Java {
    if (!this._java) {
      this._java = new Java(this.console, this.fileSystem);
    }
    return this._java;
  }

  private _logger: Logger;
  get logger(): Logger {
    if (!this._logger) {
      this._logger = new Logger(this.projectName);
    }
    return this._logger;
  }

  private _sqlite: Sqlite;
  get sqlite(): Sqlite {
    if (!this._sqlite) {
      this._sqlite = new Sqlite(this.projectName, this.console, this.fileSystem);
    }
    return this._sqlite;
  }

  private _extensions: Extensions;
  get extensions(): Extensions {
    if (!this._extensions) {
      this._extensions = new Extensions(this.console, this.sqlite, this.context, this.fileSystem, this.logger);
    }
    return this._extensions;
  }

  private _windows: Windows;
  get windows(): Windows {
    if (!this._windows) {
      this._windows = new Windows(this.projectName, this.console, this.fileSystem);
    }
    return this._windows;
  }
}
