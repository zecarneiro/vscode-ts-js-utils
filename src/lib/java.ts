import { FileSystem } from './file-system';
import { Console } from './console/console';
import { Java as JavaNode } from 'node-ts-js-utils';

export class Java extends JavaNode {
  constructor(
    protected console: Console,
    protected fileSystem: FileSystem,
  ) {
    super(console, fileSystem);
  }
}
