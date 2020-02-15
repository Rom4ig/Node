const http = require("http");
const handler = require('./handler');

let server = http.createServer();
server.on('request', handler);
server.listen(5000);
