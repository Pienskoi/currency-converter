'use strict';

const https = require('https');
const url = 'https://api.exchangeratesapi.io';

const convert = ({ value = 1, from, to, day = 'latest' }) => {
  return new Promise((resolve, reject) => {
    https.get(`${url}/${day}?base=${from}`, res => {
      const code = res.statusCode;
      if (code !== 200) {
        reject(new Error(`HTTP status code ${code}`));
        res.resume;
      }

      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        try {
          const parsedData = JSON.parse(data);
          const currencyRate = parsedData.rates[to];
          const convertedValue = value * currencyRate;
          resolve(convertedValue);
        } catch (err) {
          reject(err);
        }
      });
    }).on('error', err => {
      reject(err);
    });
  });
};

module.exports = convert;
