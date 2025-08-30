//Prerequisites
  //sudo apt update && sudo apt install -y nodejs npm
  //mkdir webapp && cd webapp
  //nano app.js



const http = require("http");

const hostname = "0.0.0.0";
const port = 3000;
const vmName = process.env.VM_NAME || "Unknown VM";

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end(`Hello from ${vmName}\n`);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
