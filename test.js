'use strict';

const assert = require('assert').strict;
const nock = require('nock');

const convert = require('./index.js');

const url = 'https://api.exchangeratesapi.io';
const pathLatest = '/latest?base=USD';
const responseLatest = {
  rates: {
    PHP: 10,
    USD: 1
  },
  base: 'USD'
};
const pathByDay = '/2020-06-28?base=EUR';
const responseByDay = {
  rates: {
    JPY: 20,
    EUR: 1
  },
  base: 'EUR',
  date: '2020-06-28'
};

const tests = [
  [{ from: 'USD', to: 'PHP' },
    10, 'Default value and day'],
  [{ value: 0.1, from: 'USD', to: 'PHP' },
    1, 'Default date'],
  [{ value: 0, from: 'USD', to: 'PHP' },
    0, 'Zero value'],
  [{ from: 'USD', to: 'USD' },
    1, 'Same currencies'],
  [{ from: 'EUR', to: 'JPY', day: '2020-06-28' },
    20, 'Default value'],
  [{ value: 5, from: 'EUR', to: 'JPY', day: '2020-06-28' },
    100, 'All parameters']
];

const scope = (url, path, response) => {
  nock(url)
    .persist()
    .get(path)
    .reply(200, response);
};

const runTests = async () => {
  const results = [];
  for (const test of tests) {
    const [par, expected, name] = test;
    const result = await convert(par);
    try {
      assert.strictEqual(result, expected, `Error in test "${name}"`);
    } catch (err) {
      const { message, operator } = err;
      results.push({ message, expected, result, operator });
    }
  }
  console.table(results);
};

scope(url, pathLatest, responseLatest);
scope(url, pathByDay, responseByDay);
runTests();
