/**
 * @since 2020-02-04 04:00
 * @author vivaxy
 */
import { betterExeca } from '../helpers';

export default async function getCommitByTag({
  tag,
  cwd,
}: {
  tag: string;
  cwd: string;
}) {
  try {
    const { exitCode, stdout } = await betterExeca(
      'git',
      ['rev-parse', `${tag}^{}`],
      {
        cwd,
      },
    );
    if (exitCode === 0) {
      return stdout;
    }
  } catch (e) {}
  return '';
}
