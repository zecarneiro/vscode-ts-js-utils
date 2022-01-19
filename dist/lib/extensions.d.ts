import { Extension, ExtensionContext } from 'vscode';
import { Console } from './console/console';
import { IDisabledExtension } from '../interface/Idisabled-extension';
import { IExtensionInfo } from '../interface/Iextension-info';
import { ProcessorUtils } from '../processor-utils';
import { Response, Sqlite } from 'node-ts-js-utils';
export declare class Extensions extends ProcessorUtils {
    private console;
    private sqlite;
    private context;
    readonly tableNameDbVs: string;
    readonly tableKeyDisabledExtensions: string;
    readonly extensionsDisabledEnabledMsg = "Extensions was disabled/enabled. Please Restart VSCode!!!";
    constructor(console: Console, sqlite: Sqlite, context: ExtensionContext);
    get dbFile(): string;
    get disabled(): IDisabledExtension[];
    /**
     * Refresh of 2 in 2 min by default
     * @param  {number} valMinutes
     */
    set refreshTime(valMinutes: number | undefined);
    get refreshTime(): number;
    isDisabled(id: string): boolean;
    getDisabledExtension(id: string): IDisabledExtension | undefined;
    private enableAll;
    disable(ids: string[]): Response<boolean>;
    getPath(): string;
    isInstalled(id: string): boolean;
    installUninstallExtensions(ids: string[], isInstall: boolean): Promise<void>;
    getExtension<T>(extensionId: string): Extension<T>;
    getExtensionInfo(extensionId: string): IExtensionInfo;
    getExtensionSettings<T = any>(extensionId: string, section?: string): T | undefined;
    private readonly minRefreshTime;
    private _disabled;
    private loadTime;
    private _refreshTime;
    private refreshDisabledData;
}
