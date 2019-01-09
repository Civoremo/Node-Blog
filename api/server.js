const db = require('../data/helpers/userDb.js');
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

const server = express();

server.use(morgan('short'));
server.use(helmet());
server.use(express.json());
server.use(cors());

// middleware


server.get('/', (req, res) => {
    // res.send('sanity check success');
    db.get()
        .then(users => {
            res.status(200).json({ users });
        })
        .catch(err => {
            res.status(500).json({ error: 'Users information could not be retrieved'});
        });
})

module.exports = server;