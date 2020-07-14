/**
 * @since 2020-02-04 10:21
 * @author vivaxy
 */
import { betterExeca } from '../helpers';

export default async function merge({
  branch,
  cwd,
}: {
  branch: string;
  cwd: string;
}) {
  await betterExeca('git', ['merge', branch], { cwd });
}
