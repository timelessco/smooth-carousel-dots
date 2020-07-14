/**
 * @since 15-08-19 16:37
 * @author vivaxy
 */

import test from 'ava';
import chalk from 'chalk';
import * as figures from 'figures';
import * as logSymbol from 'log-symbols';
import * as log from '../index';

let __memo__: any[] = [];
let globalConsoleLog = global.console.log;

test.beforeEach(() => {
  global.console.log = function mockConsoleLog(...messages: any[]) {
    __memo__ = __memo__.concat(messages);
  };
});

test.afterEach(() => {
  while (__memo__.length) {
    __memo__.pop();
  }
  global.console.log = globalConsoleLog;
});

test('should output debug levels', (t) => {
  log.setLevel(log.levels.debug);
  log.debug('debug', log.levels.debug);
  t.deepEqual(__memo__, [
    chalk.grey(figures.pointerSmall),
    'debug',
    log.levels.debug,
  ]);
});

test('should output info levels', (t) => {
  log.info('info', log.levels.info);
  t.deepEqual(__memo__, [logSymbol.info, 'info', log.levels.info]);
});

test('should output success levels', (t) => {
  log.success('success', log.levels.success);
  t.deepEqual(__memo__, [logSymbol.success, 'success', log.levels.success]);
});

test('should output warn levels', (t) => {
  log.warn('warn', log.levels.warn);
  t.deepEqual(__memo__, [logSymbol.warning, 'warn', log.levels.warn]);
});

test('should output error levels', (t) => {
  log.error('error', log.levels.error);
  t.deepEqual(__memo__, [logSymbol.error, 'error', log.levels.error]);
});

test('should follow log level info', (t) => {
  log.setLevel(log.levels.info);
  log.debug();
  log.info();
  log.success();
  log.warn();
  log.error();
  t.deepEqual(__memo__, [
    logSymbol.info,
    logSymbol.success,
    logSymbol.warning,
    logSymbol.error,
  ]);
});

test('should follow log level success', (t) => {
  log.setLevel(log.levels.success);
  log.debug();
  log.info();
  log.success();
  log.warn();
  log.error();
  t.deepEqual(__memo__, [
    logSymbol.success,
    logSymbol.warning,
    logSymbol.error,
  ]);
});

test('should follow log level warn', (t) => {
  log.setLevel(log.levels.warn);
  log.debug();
  log.info();
  log.success();
  log.warn();
  log.error();
  t.deepEqual(__memo__, [logSymbol.warning, logSymbol.error]);
});

test('should follow log level error', (t) => {
  log.setLevel(log.levels.error);
  log.debug();
  log.info();
  log.success();
  log.warn();
  log.error();
  t.deepEqual(__memo__, [logSymbol.error]);
});
