console.log('tag server connected');

const tagDb = require('../data/helpers/tagDb.js');
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

const tagServer = express();

tagServer.use(morgan('short'));
tagServer.use(helmet());
tagServer.use(express.json());
tagServer.use(cors());

tagServer.get('/api/tags', (req, res) => {
    const id = req.params.id;
    tagDb.get()
        .then(tags => {
            res.status(200).json({ tags });
        })
        .catch(err => {
            res.status(500).json({ error: 'could not retrieve tags '});
        });
});

tagServer.get('/api/tags/:id', (req, res) => {
    const id = req.params.id;
    tagDb.get(id)
        .then(tags => {
            res.status(200).json({ tags });
        })
        .catch(err => {
            res.status(500).json({ error: 'could not retrieve tags '});
        });
});

module.exports = tagServer;