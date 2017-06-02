"use strict";

var express = require('express');
var router = express.Router();

router.get('/shorten', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/expand', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/analytics', function(req, res, next) {
  res.send('respond with a resource');
});


module.exports = router;

