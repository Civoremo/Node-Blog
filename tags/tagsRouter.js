
const tagDb = require('../data/helpers/tagDb.js');
const express = require('express');
const router = express.Router();

// get all tags
router.get('/', (req, res) => {
    const id = req.params.id;
    tagDb.get()
        .then(tags => {
            res.status(200).json({ tags });
        })
        .catch(err => {
            res.status(500).json({ error: 'could not retrieve tags '});
        });
});

// get tags with specified ID
router.get('/:id', (req, res) => {
    const id = req.params.id;
    tagDb.get(id)
        .then(tags => {
            res.status(200).json({ tags });
        })
        .catch(err => {
            res.status(500).json({ error: 'could not retrieve tags '});
        });
});

module.exports = router;