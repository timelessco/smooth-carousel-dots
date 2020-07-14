/**
 * @since 2020-01-21 07:26
 * @author vivaxy
 */
import { betterExeca } from '../helpers';

export default async function setUserName(
  userName: string,
  { cwd }: { cwd: string },
) {
  await betterExeca('git', ['config', 'user.name', userName], { cwd });
}
