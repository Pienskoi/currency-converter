'use strict';

const https = require('https');
const url = 'https://api.exchangeratesapi.io';

const convert = (value, from, to, day = 'latest') => {
  return new Promise((resolve, reject) => {
    https.get(`${url}/${day}?base=${from}`, res => {
      const statusCode = res.statusCode;
      if (statusCode !== 200) {
        const error = new Error('Request failed.\nStatus code: ' + statusCode);
        console.error(error.message);
        res.resume();
        return;
      }

      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        const parsedData = JSON.parse(data);
        const rate = parsedData.rates[to];
        const convertedValue = value * rate;
        resolve(convertedValue);
      });
    }).on('error', e => {
      reject(e);
    });
  });
};
