/**
 * @since 2020-05-05 20:58
 * @author vivaxy
 */
import { betterExeca } from '../helpers';

export default async function isInsideWorkTree({
  cwd,
}: {
  cwd: string;
}): Promise<boolean> {
  try {
    const { stdout } = await betterExeca(
      'git',
      ['rev-parse', '--is-inside-work-tree'],
      { cwd },
    );
    return stdout === 'true';
  } catch (ex) {
    return false;
  }
}
