const express = require('express');
const router = express.Router();

router.get('/', async (req, res, next) => {
    const { id } = req.params; id;
    try {
        res.status(200).send('Todo ok')
    } catch (e) {
        next(e);
    }
});

module.exports = router;

