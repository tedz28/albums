var express = require('express');
var router = express.Router();
var data = require('../sample-data.json');

/* GET album listing. */
router.get('/albums', function(req, res, next) {
    res.send(data);
});

module.exports = router;
