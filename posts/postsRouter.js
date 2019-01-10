
const express = require('express');
const postDb = require('../data/helpers/postDb.js');
const router = express.Router();

// get all posts
router.get('/', (req, res) => {
    postDb.get()
        .then(posts => {
            res.status(200).json({ posts });
        })
        .catch(err => {
            res.status(500).json({ error: 'Posts could not be retrieved' });
        });
});

// get post by specific ID
router.get('/:id', (req, res) => {
    const userId = req.params.id;

    postDb.get(userId)
        .then(userPosts => {
            res.status(200).json({ userPosts });
        })
        .catch(err => {
            res.status(500).json({ error: 'Could not process your request at this time' });
        });
});

// add new post
router.post('/', (req, res) => {
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

// update specified post
router.put('/:id', (req, res) => {
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

// delete specified post
router.delete('/:id', (req, res) => {
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

module.exports = router;