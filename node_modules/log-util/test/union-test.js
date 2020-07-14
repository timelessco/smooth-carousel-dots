/**
 * @since 2019-06-26 18:42
 * @author vivaxy
 */
const log = require('../lib/index');

log.setLevel(log.levels.debug);
['debug', 'info', 'success', 'warn', 'error'].forEach(function(level) {
  log[level](log.levels[level], level);
});
