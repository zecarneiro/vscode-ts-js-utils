import { ITerminal } from '../../interface/Iterminals';
import { Console } from './console';
import { ProcessorUtils } from '../../processor-utils';
import { EShellType } from 'node-ts-js-utils';
export declare class Shell extends ProcessorUtils {
    private console;
    constructor(console: Console);
    private _bash;
    private _powershell;
    private _osxTerminal;
    protected get bash(): ITerminal;
    private get powershell();
    private get terminalOsx();
    private get systemVs();
    private onCloseTerminal;
    getShell(type?: EShellType): ITerminal;
    existShell(shellType?: EShellType): boolean;
}
