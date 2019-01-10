console.log('post server connected');
const postDb = require('../data/helpers/postDb.js');

const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

const postServer = express();

postServer.use(morgan('short'));
postServer.use(helmet());
postServer.use(express.json());
postServer.use(cors());

postServer.get('/api/posts', (req, res) => {
    postDb.get()
        .then(posts => {
            res.status(200).json({ posts });
        })
        .catch(err => {
            res.status(500).json({ error: 'Posts could not be retrieved' });
        });
});

postServer.get('/api/posts/:id', (req, res) => {
    const userId = req.params.id;

    postDb.get(userId)
        .then(userPosts => {
            res.status(200).json({ userPosts });
        })
        .catch(err => {
            res.status(500).json({ error: 'Could not process your request at this time' });
        });
});

postServer.post('/api/posts', (req, res) => {
    const { user, text } = req.body;

    if(req.body) {
        postDb.insert(req.body)
            .then(result => {
                res.status(201).json({ result });
            })
            .catch(err => {
                res.status(500).json({ error: 'could not create new post' });
            });
    } else {
        res.status(400).json({ error: 'please provide text'});
    }
});

postServer.put('/api/posts/:id', (req, res) => {
    const id = req.params.id;

    if(req.body) {
        postDb.update(id, req.body)
            .then(result => {
                res.status(200).json({ result });
            })
            .catch(err => {
                res.status(500).json({ error: 'could not update post at this time' });
            });
    } else {
        res.status(404).json({ error: 'please provide text for updating '});
    }
});

postServer.delete('/api/posts/:id', (req, res) => {
    const id = req.params.id;

    postDb.remove(id)
        .then(result => {
            if(result !== 0) {
                res.status(200).json({ result });
            } else {
                res.status(404).json({ error: 'could not find specified post for deletion' });
            }
        })
        .catch(err => {
            res.status(500).json({ error: 'could not delete specified post at this time' });
        });
});

module.exports = postServer;