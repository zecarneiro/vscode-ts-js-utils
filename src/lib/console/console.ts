import { Shell } from './shell';
import { commands, Terminal, TerminalOptions, window, ExtensionContext } from 'vscode';
import { IRegisterCmd } from '../../interface/Iregister-cmd';
import { Console as ConsoleNode, ICommandInfo, Response } from 'node-ts-js-utils';

export class Console extends ConsoleNode {
  constructor(
    private context: ExtensionContext,
  ) {
    super();
  }

  /* -------------------------------------------------------------------------- */
  /*                                   PRIVATE                                  */
  /* -------------------------------------------------------------------------- */
  private _shellVs: Shell;

  /* -------------------------------------------------------------------------- */
  /*                                   PUBLIC                                   */
  /* -------------------------------------------------------------------------- */
  get shellVs(): Shell {
    if (!this._shellVs) {
      this._shellVs = new Shell(this);
    }
    return this._shellVs;
  }
  async exec(command: ICommandInfo): Promise<Response<string>> {
    const response = await super.exec(command);
    if (command.verbose) {
      response.print();
    }
    return response;
  }

  execTerminal(command: ICommandInfo) {
    const cmd = this.getCommandWithArgs(command);
    const terminal = this.shellVs.getShell(command.shellType);
    if (command.cwd) {
      terminal.term?.sendText(`cd "${command.cwd}"`);
    }
    terminal.term?.show(true);
    terminal.term?.sendText(cmd);
  }

  createTerminal(options: TerminalOptions): Terminal | undefined {
    options['shellPath'] = !options.shellPath ? this.shell.getShell() : options.shellPath;
    options['name'] = this.projectName + ': ' + options?.name;
    let terminal = this.getActiveTerminal(options.name);
    if (!terminal) {
      terminal = window.createTerminal(options);
    }
    return terminal;
  }

  registerCommand(data: IRegisterCmd[]) {
    data.forEach((value) => {
      if (value.callback) {
        const register = commands.registerCommand(value.command, value.callback?.caller, value.callback?.thisArg);
        this.context.subscriptions.push(register);
      }
    });
  }

  getActiveTerminal(name: string): Terminal | undefined {
    return window.terminals.find((t) => t.name === name);
  }

  async execCommand<T>(command: string, ...rest: any[]): Promise<T | undefined> {
    return await commands.executeCommand<T>(command, rest);
  }

  async closeTerminal(processId: number) {
    await this.execCommand('workbench.action.terminal.kill', processId);
  }
}
