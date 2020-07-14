/**
 * @since 2020-02-19 02:30
 * @author vivaxy
 */
import { betterExeca } from '../helpers';
import { FileStatus } from '../helpers/types';

export default async function getStagedFiles({
  cwd,
}: {
  cwd: string;
}): Promise<FileStatus[]> {
  const { stdout } = await betterExeca(
    'git',
    ['diff', '--cached', '--name-status'],
    { cwd },
  );
  return stdout
    .split('\n')
    .filter(Boolean)
    .map(function(line) {
      const sec = line.split('\t');
      return {
        filename: sec[1],
        diffType: sec[0],
      } as FileStatus;
    });
}
