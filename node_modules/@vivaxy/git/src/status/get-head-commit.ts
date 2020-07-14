/**
 * @since 2019-08-01 14:46
 * @author vivaxy
 */
import { betterExeca } from '../helpers';

export default async function getHeadCommit({ cwd }: { cwd: string }) {
  const { stdout } = await betterExeca('git', ['rev-parse', 'HEAD'], { cwd });
  return stdout;
}
