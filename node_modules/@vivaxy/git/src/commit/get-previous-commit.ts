/**
 * @since 20190920 16:36
 * @author vivaxy
 */
import { betterExeca } from '../helpers';

export default async function getPreviousCommit({
  from = 'HEAD',
  cwd,
}: {
  from?: string;
  cwd: string;
}): Promise<string> {
  try {
    const { stdout } = await betterExeca(
      'git',
      ['show', '-s', '--pretty=%p', `${from}^1`],
      { cwd },
    );
    return stdout;
  } catch (e) {
    return '';
  }
}
