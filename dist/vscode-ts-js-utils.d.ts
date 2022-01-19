import { Logger } from './lib/global/logger';
import { ExtensionContext } from 'vscode';
import { Console } from './lib/console/console';
import { Extensions } from './lib/extensions';
import { FileSystem } from './lib/global/file-system';
import { Windows } from './lib/window';
import { INodeTsJsUtilsGlobal, NodeTsJsUtils } from 'node-ts-js-utils';
export declare class VscodeTsJsUtils extends NodeTsJsUtils {
    private context;
    constructor(projectName: string, context: ExtensionContext);
    protected get globalData(): INodeTsJsUtilsGlobal;
    protected _console: Console;
    get console(): Console;
    private _fileSystem;
    get fileSystem(): FileSystem;
    private _logger;
    get logger(): Logger;
    private _extensions;
    get extensions(): Extensions;
    private _windows;
    get windows(): Windows;
}
