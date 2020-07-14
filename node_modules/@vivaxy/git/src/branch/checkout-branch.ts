/**
 * @since 2020-02-04 09:39
 * @author vivaxy
 */
import { betterExeca } from '../helpers';
export default async function checkoutBranch({
  branch,
  create = false,
  cwd,
}: {
  branch: string;
  create?: boolean;
  cwd: string;
}) {
  let params = ['checkout'];
  if (create) {
    params.push('-b');
  }
  params.push(branch);
  await betterExeca('git', params, { cwd });
}
