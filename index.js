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
  if (!from) {
    reject(new Error('No currency to convert from.'));
  } else if (!to) {
    reject(new Error('No currency to convert to.'));
  } else if (typeof value !== 'number' || Number.isNaN(value)) {
    reject(new Error('Value to convert is not a number.'));
  }

  https.get(`${url}/${day}?base=${from}`, res => {
    const code = res.statusCode;
    if (code !== 200 && code !== 400) {
      reject(new Error('Request failed.\nStatus code: ' + code));
      res.resume;
    }

    let data = '';
    res.on('data', chunk => { data += chunk; });
    res.on('end', () => {
      const parsedData = JSON.parse(data);
      if (parsedData.error) {
        reject(new Error(parsedData.error));
      } else if (!Object.keys(parsedData.rates).includes(to)) {
        reject(new Error(`Currency '${to}' is not supported.`));
      } else {
        const rate = parsedData.rates[to];
        const convertedValue = value * rate;
        resolve(convertedValue);
      }
    });
  }).on('error', e => {
    reject(e);
  });
});

module.exports = convert;
