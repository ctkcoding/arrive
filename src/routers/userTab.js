const express = require('express');
const ws = require('ws');
const testData = require('../data/userTabsTest.json');
// const livePage = require('../view/userTabsLive.ejs')
const utils = require('../utils/chatReader.js');

const userTabRouter = express.Router();

userTabRouter.route('/').get((req, res) => {

    let liveDataMap = utils.getLiveData();

    let liveData = Array.from(liveDataMap, function(entry) {
      return {user: entry[0], wordCount: entry[1]};
    });
    // console.log("json data: ", liveData);

    res.render('userTabsLive', {
    });
  });

  userTabRouter.route('/liveJson').get((req, res) => {

    let liveDataMap = utils.getLiveData();

    let liveData = Array.from(liveDataMap, function(entry) {
      return {user: entry[0], wordCount: entry[1]};
    });

    res.send(liveData);
  });

  userTabRouter.route('/staticHtml').get((req, res) => {

    let liveDataMap = utils.getLiveData();

    let liveData = Array.from(liveDataMap, function(entry) {
      return {user: entry[0], wordCount: entry[1]};
    });
    // console.log("json data: ", liveData);

    res.render('userTabs', {
      userTabs: liveData,
    });
  });

module.exports = userTabRouter;