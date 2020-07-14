/**
 * @since 2020-01-23 11:26
 * @author vivaxy
 */
import { betterExeca } from '../helpers';

export default async function lsFiles(
  paths: string[],
  { cwd }: { cwd: string },
) {
  const { stdout } = await betterExeca('git', ['ls-files', ...paths], { cwd });
  return stdout.split('\n').filter(Boolean);
}
