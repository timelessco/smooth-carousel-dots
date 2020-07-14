/**
 * @since 2020-02-05 09:41
 * @author vivaxy
 */
import betterExeca from '../helpers/better-execa';
import { FileStatus } from '../helpers/types';

export interface Commit {
  message: string;
  hash: string;
  tags: string[];
  date: number;
  files: FileStatus[];
}

function parseCommits(input: string): Commit {
  const ret: Partial<Commit> = {};
  const fieldsParsers = {
    message(input: string) {
      return input;
    },
    hash(input: string) {
      return input;
    },
    tags(input: string) {
      const TAG_STARTING = 'tag: ';
      // remove ` (` and `)`
      return input
        .slice(2, -1)
        .split(', ')
        .filter(function(str) {
          return str.startsWith(TAG_STARTING);
        })
        .map(function(str) {
          return str.slice(TAG_STARTING.length);
        });
    },
    date(input: string) {
      return new Date(input).getTime();
    },
    files(input: string) {
      // remove `\n` and `\n`
      return input
        .slice(1)
        .split('\n')
        .filter(Boolean)
        .map(function(line) {
          const sec = line.split('\t');
          return {
            filename: sec[1],
            diffType: sec[0],
          };
        });
    },
  };
  let contentStartIndex = 0;
  (Object.keys(fieldsParsers) as (keyof typeof fieldsParsers)[]).forEach(
    function(key, index, allKeys) {
      if (index === 0) {
        // first key
        const delimiter = `\n-${key}-\n`;
        contentStartIndex = delimiter.length;
      }
      if (allKeys.length - 1 === index) {
        // last key
        // @ts-ignore
        ret[key] = fieldsParsers[key](input.slice(contentStartIndex));
        return;
      }
      const nextKey = allKeys[index + 1];
      const nextDelimiter = `\n-${nextKey}-\n`;
      const nextKeyStartIndex = input.indexOf(nextDelimiter, contentStartIndex);
      // @ts-ignore
      ret[key] = fieldsParsers[key](
        input.slice(contentStartIndex, nextKeyStartIndex),
      );
      contentStartIndex = nextKeyStartIndex + nextDelimiter.length;
    },
  );
  return ret as Commit;
}

export default async function getCommits({
  from = '',
  to = 'HEAD',
  paths,
  noMerges = false,
  cwd,
}: {
  from?: string;
  to?: string;
  paths?: string[];
  noMerges?: boolean;
  cwd: string;
}) {
  const DELIMETER =
    '------------------------@vivaxy/git/getCommits------------------------';
  const args = [
    'log',
    `--format=${DELIMETER}%n-message-%n%B%n-hash-%n%H%n-tags-%n%d%n-date-%n%ci%n-files-`,
    '--name-status',
  ];
  args.push([from, to].filter(Boolean).join('..'));
  if (paths && paths.length) {
    args.push('--', ...paths);
  }
  if (noMerges) {
    args.push('--no-merges');
  }
  const ret: Commit[] = [];
  try {
    const { exitCode, stdout } = await betterExeca('git', args, {
      cwd,
    });
    if (exitCode === 0) {
      return stdout
        .split(DELIMETER)
        .filter(Boolean)
        .map(parseCommits);
    }
  } catch (e) {}
  return ret;
}
