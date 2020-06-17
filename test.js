'use strict';

const assert = require('assert').strict;

const convert = require('./index.js');

const tests = [
  [{ from: 'USD', to: 'JPY' },                              'No value and day'],
  [{ value: 0.1, from: 'JPY', to: 'JPY' },                  'No date'         ],
  [{ value: 5, from: 'EUR', to: 'BRL', day: '2019-06-28' }, 'All parameters'  ],
  [{ value: 0, from: 'BRL', to: 'USD' },                    'Zero value'      ]
];
const failTests = [
  [{ },                                           'No parameters'     ],
  [{ value: 0.5, from: 'BTC', to: 'ETH' },        'Invalid currencies'],
  [{ from: 'USD', to: 'JPY', day: '06-28-2029' }, 'Invalid day'       ],
  [{ value: 'one', from: 'USD', to: 'JPY' },      'Invalid value'     ]
];

const runTests = async () => {
  const results = [];
  for (const test of tests) {
    const [par, name] = test;
    try {
      await assert.doesNotReject(convert(par), `In test "${name}"`);
    } catch (err) {
      const { message, operator } = err;
      results.push({ message, par, operator });
    }
  }
  for (const failTest of failTests) {
    const [par, name] = failTest;
    try {
      await assert.rejects(convert(par), `In test "${name}"`);
    } catch (err) {
      const { message, operator } = err;
      results.push({ message, par, operator });
    }
  }
  console.table(results);
};

runTests();
