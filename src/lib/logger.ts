import { ELoggerType, ENotifyType, EPrintType, Functions, Logger as LoggerNode } from 'node-ts-js-utils';
import { OutputChannel, window } from 'vscode';

export class Logger extends LoggerNode {
  constructor(
    private projectName: string,
  ) {
    super();
  }

  /* -------------------------------------------------------------------------- */
  /*                                   PRIVATE                                  */
  /* -------------------------------------------------------------------------- */
  private readonly outputChannelKey = 'outputChannel';

  /* -------------------------------------------------------------------------- */
  /*                                  PROTECTED                                 */
  /* -------------------------------------------------------------------------- */
  protected get logger(): any {
    if (!this._logger) {
      this._logger = Functions.getGlobalDataValue<OutputChannel>(this.outputChannelKey);
        if (!this._logger) {
          this._logger = window.createOutputChannel(this.projectName);
          Functions.setGlobalData(this.outputChannelKey, this._logger);
        }
    }
    return this._logger;
  }
  protected printData(type: ELoggerType, data: any, printType?: EPrintType) {
    if (data) {
      const finalData = `${this.processPrefix(type)}${Functions.objectToString(data)}`;
      const logger = this.getLogger<OutputChannel>();
      logger.show(true);
      if (printType === EPrintType.sameLine) {
        logger.append(finalData);
      } else {
        if (printType === EPrintType.carriageReturn) {
          this.clearLine();
        }
        logger.appendLine(finalData);
      }
    }
  }

  /* -------------------------------------------------------------------------- */
  /*                                   PUBLIC                                   */
  /* -------------------------------------------------------------------------- */
  emptyLine(numLine: number = 1) {
    for (let i = 0; i < numLine; ++i) {
      this.getLogger<OutputChannel>().appendLine('');
    }
  }

  clearScreen() {
    this.getLogger<OutputChannel>().clear();
  }

  clearLine() {
    this.clearScreen();
  }

  notify(data: any, type?: ENotifyType) {
    const regex = /^\"|\"/g;
    data = !(data instanceof Object) ?
      data.replace(regex, '') :
      Functions.objectToString(data).replace(regex, '');
    data = `${this.prefix} - ${data}`;
    switch (type) {
      case ENotifyType.warning:
        window.showWarningMessage(data);
        break;
      case ENotifyType.error:
        window.showErrorMessage(data);
        break;
      default:
        window.showInformationMessage(data);
        break;
    }
  }
}
