/**
 * @since 2016-11-27 20:07
 * @author vivaxy
 */
import { Stdio, betterExeca } from '../helpers';

export default async function fetch({
  cwd,
  stdio = 'inherit',
}: {
  cwd: string;
  stdio?: Stdio;
}) {
  return await betterExeca('git', ['fetch', '-p'], {
    stdio,
    cwd,
  });
}
