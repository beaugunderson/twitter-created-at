'use strict';

var cors = require('cors');
var express = require('express');
var moment = require('moment');
var request = require('request');

var app = express();

app.use(cors());

app.use(function (req, res, next) {
  var accessToken = req.param('access_token');

  if (!accessToken) {
    return res.sendStatus(401);
  }

  if (accessToken !== process.env.ACCESS_TOKEN) {
    return res.sendStatus(403);
  }

  next();
});

function creationDate(screenName, cb) {
  request.get({
    url: 'https://api.twitter.com/1.1/users/show.json',
    qs: {screen_name: screenName},
    headers: {Authorization: 'Bearer ' + process.env.TWITTER_TOKEN},
    json: true
  }, function (err, response, body) {
    if (err || !body.created_at) {
      return cb(err);
    }

    cb(null, body.created_at);
  });
}

app.get('/:screenName', function (req, res) {
  creationDate(req.params.screenName, function (err, date) {
    if (err) {
      return res.send(err);
    }

    var dateMoment = moment(new Date(date));

    res.send({
      creationDate: date,
      isoString: dateMoment.toISOString(),
      relativeTime: dateMoment.fromNow()
    });
  });
});

app.listen(process.env.PORT);
