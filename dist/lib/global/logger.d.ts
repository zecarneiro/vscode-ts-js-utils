import { ELoggerType, EPrintType, Logger as LoggerNode } from 'node-ts-js-utils';
export declare class Logger extends LoggerNode {
    constructor();
    private readonly outputChannelKey;
    protected get logger(): any;
    protected printData(type: ELoggerType, data: any, printType?: EPrintType): void;
    emptyLine(numLine?: number): void;
    clearScreen(): void;
    clearLine(): void;
}
