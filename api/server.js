const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

const server = express();

server.use(morgan('short'));
server.use(helmet());
server.use(express.json());
server.use(cors());

server.get('/', (req, res) => {
    res.status('sanity check success');
})