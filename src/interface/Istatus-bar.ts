import { Command } from 'vscode';

export interface IStatusBar {
    text: string,
    command: string | Command | undefined,
    tooltip?: string
}
