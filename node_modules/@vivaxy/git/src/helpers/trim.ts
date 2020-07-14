/**
 * @since 2019-07-31 14:30
 * @author vivaxy
 */
export function trimStart(str: string, search: string) {
  while (str.startsWith(search)) {
    str = str.slice(search.length);
  }
  return str;
}

export function trimEnd(str: string, search: string) {
  while (str.endsWith(search)) {
    str = str.slice(0, -search.length);
  }
  return str;
}

export function trim(str: string, search: string) {
  return trimEnd(trimStart(str, search), search);
}
