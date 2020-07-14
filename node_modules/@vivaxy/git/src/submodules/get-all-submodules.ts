/**
 * @since 2019-07-31 14:28
 * @author vivaxy
 */
import * as path from 'path';
import * as fse from 'fs-extra';
import { trim } from '../helpers';

interface Submodule {
  name: string;
  path: string;
  url: string;
}

export default async function getAllSubmodules({
  cwd,
}: {
  cwd: string;
}): Promise<Submodule[]> {
  const gitModulesPath = path.join(cwd, '.gitmodules');
  if (!(await fse.pathExists(gitModulesPath))) {
    return [];
  }
  const submodulesFileContent = await fse.readFile(gitModulesPath, 'utf8');
  const submodules: Submodule[] = [];
  const lines = submodulesFileContent.split('\n');
  let lineIndex = 0;
  while (lineIndex < lines.length) {
    let line = lines[lineIndex];
    if (line.startsWith('[submodule ')) {
      const name = trim(line.slice('[submodule '.length, -']'.length), '"');
      const submodule: Submodule = {
        name,
        path: '',
        url: '',
      };
      lineIndex++;
      while (
        lineIndex < lines.length &&
        (line = lines[lineIndex]) &&
        !line.startsWith('[submodule ')
      ) {
        const [key, value] = line.split('=').map(function(s) {
          return s.trim();
        });
        if (key === 'path' || key === 'url') {
          submodule[key] = value;
        }
        lineIndex++;
      }
      submodules.push(submodule);
      continue;
    }
    lineIndex++;
  }
  return submodules;
}
