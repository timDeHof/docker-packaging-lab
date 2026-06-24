const http = require("http");
const { info, error: logError } = require("./logger");

const server = http.createServer((req, res) => {
  const start = Date.now();

  // Wrap end to capture status code
  const originalEnd = res.end;
  res.end = function (...args) {
    const duration = Date.now() - start;
    info("request", {
      method: req.method,
      path: req.url,
      status: res.statusCode,
      duration_ms: duration,
    });
    originalEnd.apply(res, args);
  };

  if (req.url === "/health") {
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ status: "ok" }));
  }

  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("ok");
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => info("server_started", { port: PORT }));

module.exports = server;
