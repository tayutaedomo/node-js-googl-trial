"use strict";

var debug = require('debug')('node-js-googl-trial:routes:google-url');

var express = require('express');
var router = express.Router();

var beautify = require('js-beautify').js_beautify;
var GoogleUrl = require( 'google-url' );

var TITLE_SHORTEN = 'google-url Shorten API';


function createGoogleUrl() {
  return new GoogleUrl( { key: process.env.GOOGLE_API_KEY });
}

router.get('/shorten', function(req, res, next) {
  res.render('google-url/shorten', {
    title: TITLE_SHORTEN,
    data: {}
  });
});

router.post('/shorten', function(req, res, next) {
  var googleUrl = createGoogleUrl();

  googleUrl.shorten(req.body.url, function(err, result) {
    debug('shorten', result, err);

    if (err) {
      res.render('google-url/shorten', {
        title: TITLE_SHORTEN,
        data: {
          error: err,
          errorStr: beautify(JSON.stringify(err), { indent_size: 2 })
        }
      });

    } else {
      res.render('google-url/shorten', {
        title: TITLE_SHORTEN,
        data: {
          result: result,
          resultStr: result ? beautify(JSON.stringify(result), { indent_size: 2 }) : ''
        }
      });
    }
  });
});

router.get('/expand', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/analytics', function(req, res, next) {
  res.send('respond with a resource');
});


module.exports = router;

