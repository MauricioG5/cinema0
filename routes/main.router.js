const express = require('express');
const router = express.Router();

router.get('/', async (req, res, next) => {
    try{
     res.status(200).send('My cinema api')
    } catch(e){
    next(e);
}
});

module.exports = router;