/**
 * @since 2020-01-20 03:06
 * @author vivaxy
 */
import { betterExeca } from '../helpers';

export default async function addRemote(
  shortname: string,
  url: string,
  { cwd }: { cwd: string },
) {
  await betterExeca('git', ['remote', 'add', shortname, url], { cwd });
}
