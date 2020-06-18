'use strict';

const https = require('https');
const url = 'https://api.exchangeratesapi.io';

const convert = options => new Promise((resolve, reject) => {
  const from = options.from;
  const to = options.to;
  let value;
  if (!Object.keys(options).includes('value')) value = 1;
  else value = options.value;
  const day = options.day || 'latest';

  https.get(`${url}/${day}?base=${from}`, res => {
    const code = res.statusCode;
    if (code !== 200) {
      reject(new Error(`HTTP status code ${code}`));
      res.resume;
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
