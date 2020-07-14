/**
 * @since 2016-11-22 16:05
 * @author vivaxy
 */
import * as path from 'path';
import * as fse from 'fs-extra';
import isInsideWorkTree from './is-inside-work-tree';

export default async function isRepositoryRoot({
  cwd,
}: {
  cwd: string;
}): Promise<boolean> {
  if (
    (await fse.pathExists(path.join(cwd, '.git'))) &&
    (await isInsideWorkTree({ cwd }))
  ) {
    return true;
  }
  return false;
}
