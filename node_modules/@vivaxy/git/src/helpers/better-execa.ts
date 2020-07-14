/**
 * @since 2019-07-25 16:10
 * @author vivaxy
 */
import * as execa from 'execa';
import { Stdio } from './types';

export default async function betterExeca(
  bin: string,
  commands: string[],
  {
    cwd,
    shell = false,
    stdio,
  }: { cwd: string; shell?: boolean; stdio?: Stdio },
) {
  const childProcess = await execa(bin, commands, {
    cwd,
    reject: false,
    shell,
    stdio,
  });
  if (childProcess.exitCode !== 0) {
    throw new Error(childProcess.stderr);
  }
  return childProcess;
}
