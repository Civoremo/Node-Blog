
const express = require('express');
const db = require('../data/helpers/userDb.js');
const upperCaseUserName = require('../common/upperCaseMiddleware.js');
const router = express.Router();


// retrieve all posts by a user
router.get('/tags/:id', (req, res) => {
    const id = req.params.id;
    db.getUserPosts(id)
        .then(allPosts => {
            res.status(200).json({ allPosts });
        })
        .catch(err => {
            res.status(500).json({ error: 'could not retrieve all of user posts' });
        });
});

// retrieve all users
router.get('/', (req, res, next) => {
    db.get()
        .then(users => {
            res.names = users;
            next();
        })
        .catch(err => {
            res.status(500).json({ error: 'Users information could not be retrieved'});
        });
}, upperCaseUserName );

// retrieve specific user with an ID
router.get('/:id', (req, res) => {
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

// create a new user
router.post('/', (req, res) => {
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

// update already created user
router.put('/:id', (req, res) => {
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

// delete user with specific ID
router.delete('/:id', (req, res) => {
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

module.exports = router;