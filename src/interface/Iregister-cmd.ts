import { ICallback } from 'node-ts-js-utils';

export interface IRegisterCmd {
    command: string;
    callback?: ICallback,
}
