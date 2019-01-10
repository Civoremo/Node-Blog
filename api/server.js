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
    
    const { users } = res;

    const Uuser = users.map(user => ({...user, name: user.name.toUpperCase()}));

    res.status(200).json(Uuser)
    // next();
}

server.get('/', (req, res, next) => {
    db.get()
        .then(users => {
            res.users = users;
            next();
        })
        .catch(err => {
            res.status(500).json({ error: 'Users information could not be retrieved'});
        });
}, upperCaseUserName

);

server.get('/:id', (req, res) => {
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

server.post('/', (req, res) => {
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

server.put('/:id', (req, res) => {
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

server.delete('/:id', (req, res) => {
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
            res.status(500).json({ error: 'User could not be delted' });
        });
})

module.exports = server;