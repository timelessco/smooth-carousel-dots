/**
 * @since 2019-08-01 14:03
 * @author vivaxy
 */
import { betterExeca } from '../helpers';

export default async function getRemoteUrl({
  remote,
  cwd,
}: {
  remote: string;
  cwd: string;
}): Promise<string> {
  const { stdout } = await betterExeca('git', ['remote', 'get-url', remote], {
    cwd,
  });
  return stdout;
}
