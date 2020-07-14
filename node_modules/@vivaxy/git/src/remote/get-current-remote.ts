/**
 * @since 2019-06-28 10:17
 * @author vivaxy
 */
import { betterExeca } from '../helpers';

export default async function getCurrentRemote({
  cwd,
}: {
  cwd: string;
}): Promise<string> {
  const { exitCode, stdout } = await betterExeca('git', ['remote'], { cwd });
  if (exitCode === 0) {
    return stdout;
  }
  return '';
}
