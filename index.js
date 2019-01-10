
const server = require(`./api/userServer.js`);
const postServer = require('./api/postServer.js');
const tagServer = require('./api/tagServer.js');

server.use(postServer);
server.use(tagServer);

server.listen(5000, () => console.log('server on port 5k'));