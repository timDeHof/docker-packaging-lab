const http = require("http");
const server = require("./index.js");

const testHealth = () => {
  http
    .get("http://localhost:3000/health", (res) => {
      let data = "";
      res.on("data", (c) => (data += c));
      res.on("end", () => {
        const passed = data === '{"status":"ok"}';
        console.log(passed ? "PASS" : "FAIL");
        server.close();
        process.exit(passed ? 0 : 1);
      });
    })
    .on("error", (err) => {
      console.error("FAIL:", err.message);
      server.close();
      process.exit(1);
    });
};

testHealth();
