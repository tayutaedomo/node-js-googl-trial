"use strict";

var debug = require('debug')('node-js-googl-trial:routes:googl');

var express = require('express');
var router = express.Router();

var beautify = require('js-beautify').js_beautify;
var googl = require('goo.gl');

googl.setKey(process.env.GOOGLE_API_KEY);

var TITLE_SHORTEN = 'goo.gl Shorten API';
var TITLE_EXPAND = 'goo.gl Expand API';
var TITLE_ANALYTICS = 'goo.gl Analytics API';
var TEMPLATE_SHORTEN = 'googl/shorten';
var TEMPLATE_EXPAND = 'googl/expand';
var TEMPLATE_ANALYTICS = 'googl/analytics';


router.get('/shorten', function(req, res, next) {
  res.render(TEMPLATE_SHORTEN, {
    title: TITLE_SHORTEN,
    data: {}
  });
});

router.post('/shorten', function(req, res, next) {
  var payload = {
    title: TITLE_SHORTEN,
    data: {}
  };

  debug('shorten req.body', req.body);

  googl.shorten(req.body.url).then(function(result) {
    payload.data.result = result;
    payload.data.resultStr = beautify(JSON.stringify(result), { indent_size: 2 });

    res.render(TEMPLATE_SHORTEN, payload);

  }).catch(function(err) {
    payload.data.error = err;
    payload.data.errorStr = beautify(JSON.stringify(err), { indent_size: 2 });

    res.render(TEMPLATE_SHORTEN, payload);
  });
});

router.get('/expand', function(req, res, next) {
  res.render(TEMPLATE_EXPAND, {
    title: TITLE_SHORTEN,
    data: {}
  });
});

router.post('/expand', function(req, res, next) {
  var payload = {
    title: TITLE_EXPAND,
    data: {}
  };

  googl.expand(req.body.url).then(function(result) {
    payload.data.result = result;
    payload.data.resultStr = beautify(JSON.stringify(result), { indent_size: 2 });

    res.render(TEMPLATE_EXPAND, payload);

  }).catch(function(err) {
    payload.data.error = err;
    payload.data.errorStr = beautify(JSON.stringify(err), { indent_size: 2 });

    res.render(TEMPLATE_EXPAND, payload);
  });
});

router.get('/analytics', function(req, res, next) {
  res.render(TEMPLATE_ANALYTICS, {
    title: TITLE_ANALYTICS,
    data: {}
  });
});

router.post('/analytics', function(req, res, next) {
  var payload = {
    title: TITLE_ANALYTICS,
    data: {}
  };

  googl.analytics(req.body.url).then(function(result) {
    payload.data.result = result;
    payload.data.resultStr = beautify(JSON.stringify(result), { indent_size: 2 });

    res.render(TEMPLATE_ANALYTICS, payload);

  }).catch(function(err) {
    payload.data.error = err;
    payload.data.errorStr = beautify(JSON.stringify(err), { indent_size: 2 });

    res.render(TEMPLATE_ANALYTICS, payload);
  });
});


module.exports = router;

