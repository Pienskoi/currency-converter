'use strict';

const https = require('https');
const url = 'https://api.exchangeratesapi.io';

const convert = options => new Promise((resolve, reject) => {
  const value = options.value || 1;
  const from = options.from;
  const to = options.to;
  const day = options.day || 'latest';

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

module.exports = convert;
