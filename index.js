let server = require('./module/server.js');
let router = require('./module/router.js');

server.start(router.route)
