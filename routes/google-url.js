"use strict";

var debug = require('debug')('node-js-googl-trial:routes:google-url');

var express = require('express');
var router = express.Router();

var beautify = require('js-beautify').js_beautify;
var GoogleUrl = require('google-url');

var TITLE_SHORTEN = 'google-url Shorten API';
var TITLE_EXPAND = 'google-url Extend API';
var TITLE_ANALYTICS = 'google-url Analytics API';


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

  debug('shorten req.body', req.body);

  googleUrl.shorten(req.body.url, function(err, result) {
    debug('shorten', result, err);

    var payload = {
      title: TITLE_SHORTEN,
      data: {}
    };

    if (err) {
      payload.data.error = err;
      payload.data.errorStr = beautify(JSON.stringify(err), { indent_size: 2 });
    } else {
      payload.data.result = result;
      payload.data.resultStr = result ? beautify(JSON.stringify(result), { indent_size: 2 }) : '';
    }

    res.render('google-url/shorten', payload);
  });
});

router.get('/expand', function(req, res, next) {
  res.render('google-url/expand', {
    title: TITLE_EXPAND,
    data: {}
  });
});

router.post('/expand', function(req, res, next) {
  var googleUrl = createGoogleUrl();

  debug('expand req.body', req.body);

  googleUrl.expand(req.body.url, function(err, result) {
    debug('expand', result, err);

    var payload = {
      title: TITLE_EXPAND,
      data: {}
    };

    if (err) {
      payload.data.error = err;
      payload.data.errorStr = beautify(JSON.stringify(err), { indent_size: 2 });
    } else {
      payload.data.result = result;
      payload.data.resultStr = result ? beautify(JSON.stringify(result), { indent_size: 2 }) : '';
    }

    res.render('google-url/expand', payload);
  });
});

router.get('/analytics', function(req, res, next) {
  res.render('google-url/analytics', {
    title: TITLE_ANALYTICS,
    data: {}
  });
});

router.post('/analytics', function(req, res, next) {
  var googleUrl = createGoogleUrl();

  debug('analytics req.body', req.body);

  googleUrl.analytics(req.body.url, function(err, result) {
    debug('analytics', result, err);

    var payload = {
      title: TITLE_ANALYTICS,
      data: {}
    };

    if (err) {
      payload.data.error = err;
      payload.data.errorStr = beautify(JSON.stringify(err), { indent_size: 2 });
    } else {
      payload.data.result = result;
      payload.data.resultStr = result ? beautify(JSON.stringify(result), { indent_size: 2 }) : '';
    }

    res.render('google-url/analytics', payload);
  });
});


module.exports = router;

