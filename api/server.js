
const express = require('express');
const configureMiddleware = require('../config/middleware.js');
const usersRouter = require('../users/usersRouter.js');
const postsRouter = require('../posts/postsRouter.js');
const tagsRouter = require('../tags/tagsRouter.js');
const server = express();

configureMiddleware(server);
server.use('/users', usersRouter);
server.use('/posts', postsRouter);
server.use('/tags', tagsRouter);

server.get('/', (req, res) => {
    res.send('server connected');
});

module.exports = server;