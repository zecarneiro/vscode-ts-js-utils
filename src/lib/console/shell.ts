import { FileSystem } from './../file-system';
import { ITerminal } from '../../interface/Iterminals';
import { window } from 'vscode';
import { Console } from './console';
import { EShellType } from 'node-ts-js-utils';

export class Shell {
  constructor(
    private projectName: string,
    private console: Console,
    private fileSystem: FileSystem,
  ) {
    this.onCloseTerminal();
  }

  private _bash: ITerminal;
  private _powershell: ITerminal;
  private _osxTerminal: ITerminal;

  protected get bash(): ITerminal {
    const name = `${this.projectName} - Bash`;
    this._bash = { name: name, term: this.console.getActiveTerminal(name) };
    if (!this._bash.term && this.existShell(EShellType.bash)) {
      this._bash.term = window.createTerminal(name, this.console.shell.getShell(EShellType.bash));
    }
    return this._bash;
  }

  private get powershell(): ITerminal {
    const name = `${this.projectName} - Powershell`;
    this._powershell = { name: name, term: this.console.getActiveTerminal(name) };
    if (!this._powershell.term && this.existShell(EShellType.powershell)) {
      this._powershell.term = window.createTerminal(name, this.console.shell.getShell(EShellType.powershell));
    }
    return this._powershell;
  }

  private get terminalOsx(): ITerminal {
    const name = `${this.projectName} - OSX`;
    this._osxTerminal = { name: name, term: this.console.getActiveTerminal(name) };
    if (!this._osxTerminal.term && this.existShell(EShellType.terminalOsx)) {
      this._osxTerminal.term = window.createTerminal(name, this.console.shell.getShell(EShellType.terminalOsx));
    }
    return this._osxTerminal;
  }

  private get systemVs(): ITerminal {
    if (this.fileSystem.isLinux) {
      return this.bash;
    } else if (this.fileSystem.isWindows) {
      return this.powershell;
    } else if (this.fileSystem.isOsx) {
      return this.terminalOsx;
    }
    return undefined;
  }

  private onCloseTerminal() {
    window.onDidCloseTerminal((term) => {
      if (term.name === this.bash.name) {
        this.bash.term = undefined;
      } else if (term.name === this.powershell.name) {
        this.powershell.term = undefined;
      } else if (term.name === this.terminalOsx.name) {
        this.terminalOsx.term = undefined;
      }
      if (term.name === this.systemVs.name) {
        this.systemVs.term = undefined;
      }
    });
  }

  getShell(type?: EShellType): ITerminal {
    switch (type) {
      case EShellType.bash:
        return this.bash;
      case EShellType.powershell:
        return this.powershell;
      case EShellType.terminalOsx:
        return this.terminalOsx;
    }
    return this.systemVs;
  }

  existShell(shellType?: EShellType): boolean {
    return this.console.shell.existShell(shellType);
  }
}
