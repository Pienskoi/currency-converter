'use strict';

const convert = require('./index.js');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question1 = () =>  new Promise(resolve => {
  rl.question('Value to convert: (1) ', answ => resolve(answ));
});
const question2 = () =>  new Promise(resolve => {
  rl.question('From: ', answ => resolve(answ));
});
const question3 = () =>  new Promise(resolve => {
  rl.question('To: ', answ => resolve(answ));
});
const question4 = () =>  new Promise(resolve => {
  rl.question('Date(YYYY-MM-DD): (latest) ', answ => resolve(answ));
});

const args = {};

const askQuestions = async callback => {
  const value = (await question1()).trim();
  const from = (await question2()).trim();
  const to = (await question3()).trim();
  args.day = (await question4()).trim();
  if (value === '') args.value = 1;
  else args.value = parseFloat(value);
  args.from = from.toUpperCase();
  args.to = to.toUpperCase();
  try {
    const convertedValue = await convert(args);
    callback(convertedValue);
  } catch (e) {
    console.error(e);
  }
  rl.close();
};

const parseValue = val => {
  const parsedVal = parseFloat(val);
  console.log(`${args.value} ${args.from} equals ${parsedVal} ${args.to}`);
};

askQuestions(parseValue);
