const express = require('express');
const router = express.Router();
const request = require('request');
const rp = require('request-promise');
const dotenv = require('dotenv').config();
const reqURL = `http://api.planetos.com/v1/datasets/noaa_gfs_global_sflux_0.12d/point?lon=-104.991531&lat=39.742043&apikey=${process.env.NOAA_API_KEY}&count=50`;
const helper = require('../functions/helper');

/* GET home page. */
router.get('/', function(req, res, next) {

});

router.get('/data', function(req, res, next) {
  const options = {
      uri: reqURL,
      headers: {
          'User-Agent': 'Request-Promise'
      },
      json: true // Automatically parses the JSON string in the response
  };

  rp(options)
      .then( (noaaResult) =>{
        const entries = noaaResult.entries;
        const cleanEntries = helper.cleanData(entries);
        res.json(cleanEntries);
      })
      .catch(function (err) {
          console.log(err);
          res.json(err);
      });
});


module.exports = router;
