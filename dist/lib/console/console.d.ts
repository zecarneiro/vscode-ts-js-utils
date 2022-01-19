import { Shell } from './shell';
import { Terminal, TerminalOptions, ExtensionContext } from 'vscode';
import { IRegisterCmd } from '../../interface/Iregister-cmd';
import { Console as ConsoleNode, ICommandInfo, Response } from 'node-ts-js-utils';
export declare class Console extends ConsoleNode {
    private context;
    constructor(context: ExtensionContext);
    private _shellVs;
    get shellVs(): Shell;
    exec(command: ICommandInfo): Promise<Response<string>>;
    execTerminal(command: ICommandInfo): void;
    createTerminal(options: TerminalOptions): Terminal | undefined;
    registerCommand(data: IRegisterCmd[]): void;
    getActiveTerminal(name: string): Terminal | undefined;
    execCommand<T>(command: string, ...rest: any[]): Promise<T | undefined>;
    closeTerminal(processId: number): Promise<void>;
}
