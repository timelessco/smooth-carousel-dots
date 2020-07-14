/**
 * @since 15-08-19 16:13
 * @author vivaxy
 */

import chalk from 'chalk';
import * as util from 'util';
import * as figures from 'figures';
import * as logSymbols from 'log-symbols';

export let levels = {
  debug: 0,
  info: 1,
  success: 2,
  warn: 3,
  error: 4,
};

export let level: number = 0;

/**
 * You can create your own logger with namespace and logLevel
 * @param _level
 * @param namespace
 */
export function createLogger(_level: number, namespace: string) {
  return function log(...messages: any[]): void {
    if (_level >= level) {
      const formatted = messages.map(function(message) {
        if (typeof message === 'object') {
          return util.inspect(message, {
            depth: null,
          });
        }
        return message;
      });
      console.log(namespace, ...formatted);
    }
  };
}

export function setLevel(_level: number): void {
  level = _level;
}

// basic usage
export const debug = createLogger(
  levels.debug,
  chalk.grey(figures.pointerSmall)
);
export const info = createLogger(levels.info, logSymbols.info);
export const success = createLogger(levels.success, logSymbols.success);
export const warn = createLogger(levels.warn, logSymbols.warning);
export const error = createLogger(levels.error, logSymbols.error);
