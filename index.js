
const server = require(`./api/userServer.js`);
const postServer = require('./api/postServer.js');
const tagServer = require('./api/tagServer.js');

server.use(postServer);
server.use(tagServer);

const port = process.env.PORT || 5000;
server.listen(port, () => console.log('server on port 5k'));