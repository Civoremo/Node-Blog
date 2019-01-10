console.log('user server connected');

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
function upperCaseUserName(req, res, next) {
    const { names } = res;
    const Uuser = names.map(user => ({...user, name: user.name.charAt(0).toUpperCase() + user.name.slice(1)}));

    res.status(200).json(Uuser);
    next();
}

server.get('/api/user/tags/:id', (req, res) => {
    const id = req.params.id;
    db.getUserPosts(id)
        .then(allPosts => {
            res.status(200).json({ allPosts });
        })
        .catch(err => {
            res.status(500).json({ error: 'could not retrieve all of user posts' });
        });
});

server.get('/api/user', (req, res, next) => {
    db.get()
        .then(users => {
            res.names = users;
            next();
        })
        .catch(err => {
            res.status(500).json({ error: 'Users information could not be retrieved'});
        });
}, upperCaseUserName );

server.get('/api/user/:id', (req, res) => {
    const id = req.params.id;
    db.get(id)
        .then(user => {
            if(user) {
                res.status(200).json({ user });
            } else {
                res.status(404).json({ message: 'User with the specified ID does not exist' });
            }
        })
        .catch(err => {
            res.status(500).json({ error: 'User information could not be retrieved' });
        });
});

server.post('/api/user', (req, res) => {
    const { name } = req.body;
    if(name) {
        db.insert(req.body)
            .then(result => {
                res.status(201).json(result);
            })
            .catch(err => {
                res.status(500).json({ error: 'There was an error while saving user to database' });
            });
    } else {
        res.status(400).json({ error: 'Please provide name of new user' });
    }
});

server.put('/api/user/:id', (req, res) => {
    const id = req.params.id;
    const { name } = req.body;

    if(name) {
        db.update(id, {name})
            .then(result => {
                if(result !== 0) {
                    res.status(200).json({ result });
                } else {
                    res.status(404).json({ error: 'User with that ID could not be found' });
                }
            })
            .catch(err => {
                res.status(500).json({ error: 'Information could not be updated' });
            });
    } else {
        res.status(400).json({ error: 'Please provide a name' });
    }
});

server.delete('/api/user/:id', (req, res) => {
    const id = req.params.id;

    db.remove(id)
        .then(result => {
            if(result !== 0) {
                res.status(200).json({ result });
            } else {
                res.status(404).json({ error: 'User does not exist' });
            }
        })
        .catch(err => {
            res.status(500).json({ error: 'User could not be deleted' });
        });
})

module.exports = server;