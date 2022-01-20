import { FileSystem } from './file-system';
import { Console } from './console/console';
import { Sqlite as SqliteNode } from 'node-ts-js-utils';
export class Sqlite extends SqliteNode {
  constructor(
    protected projectName: string,
    protected console: Console,
    protected fileSystem: FileSystem,
  ) {
    super(projectName, console, fileSystem);
  }
}
