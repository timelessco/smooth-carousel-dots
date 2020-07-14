/**
 * @since 2019-06-28 09:59
 * @author vivaxy
 */
import { Stdio, betterExeca } from '../helpers';

export default async function commit(
  message: string,
  { cwd, stdio = 'inherit' }: { cwd: string; stdio?: Stdio },
): Promise<void> {
  await betterExeca('git', ['commit', '-m', message], { stdio, cwd });
}
