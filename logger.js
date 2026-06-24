// logger.js
const levels = { error: 0, warn: 1, info: 2, debug: 3 };

function log(level, msg, data = {}) {
  console.log(JSON.stringify({
    level,
    msg,
    ...data,
    timestamp: new Date().toISOString()
  }));
}

module.exports = {
  log,
  info: (m, d) => log("info", m, d),
  warn: (m, d) => log("warn", m, d),
  error: (m, d) => log("error", m, d),
};
