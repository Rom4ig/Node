const http = require("http");
const handler = require('./handler');
const PORT = 5000;
let server = http.createServer();
server.on('request', handler);
server.listen(PORT);
console.info(`Server listen on port ${PORT}`);