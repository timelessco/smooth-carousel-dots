/**
 * @since 2019-07-31 14:42
 * @author vivaxy
 */
import { betterExeca } from '../helpers';

export default async function isClean({
  cwd,
}: {
  cwd: string;
}): Promise<boolean> {
  const { stdout } = await betterExeca('git', ['status', '--porcelain'], {
    cwd,
  });
  return stdout === '';
}
