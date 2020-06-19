'use strict';

const https = require('https');

const requestData = (baseCurrency, date) => new Promise((resolve, reject) => {
  const url = 'https://api.exchangeratesapi.io';
  const path = `/${date}?base=${baseCurrency}`;

  https.get(url + path, res => {
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
        resolve(parsedData);
      } catch (err) {
        reject(err);
      }
    });
  }).on('error', err => {
    reject(err);
  });
});

const convert = async ({ value = 1, from, to, day = 'latest' }) => {
  const data = await requestData(from, day);
  const currencyRate = data.rates[to];
  const convertedValue = value * currencyRate;
  return convertedValue;
};

module.exports = convert;
