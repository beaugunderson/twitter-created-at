// ==UserScript==
// @name         Twitter Created At
// @namespace    http://beaugunderson.com/
// @version      1.0
// @description  Displays the user's join date when on their profile page
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.1/jquery.min.js
// @author       Beau Gunderson
// @match        https://twitter.com/*
// @grant        none
// ==/UserScript==

/*global $:true*/

'use strict';

// The access token specified in the .env of your express app
var ACCESS_TOKEN = '';

// The URL that the express app is running at
var BASE_URL = 'https://your-server.com/twitter-created-at';

$(function () {
  var screenName = $('.ProfileHeaderCard-screennameLink > span').text();

  if ($('.ProfileHeaderCard-joinDate').length > 0) {
    return;
  }

  var url = BASE_URL + '/' + screenName + '?access_token=' + ACCESS_TOKEN;

  $.getJSON(url, function (data) {
    $('.ProfileHeaderCard').prepend('<div>' + data.relativeTime + '</div>');
  });
});
