/**
 * @since 2019-07-31 14:37
 * @author vivaxy
 */
import { Stdio, betterExeca } from '../helpers';

export default async function add({
  cwd,
  stdio = 'inherit',
}: {
  cwd: string;
  stdio?: Stdio;
}): Promise<void> {
  await betterExeca('git', ['add', '.'], { stdio, cwd });
}
