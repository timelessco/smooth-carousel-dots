/**
 * @since 2019-08-01 14:34
 * @author vivaxy
 */
import getCurrentRemote from './get-current-remote';
import getRemoteUrl from './get-remote-url';

export default async function getCurrentRemoteUrl({
  cwd,
}: {
  cwd: string;
}): Promise<string> {
  const remote = await getCurrentRemote({ cwd });
  if (!remote) {
    return '';
  }
  return getRemoteUrl({ cwd, remote });
}
