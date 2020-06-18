'use strict';

const convert = require('./index.js');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const askQuestion = question => new Promise(resolve => {
  rl.question(question, answer => resolve(answer));
});

const questions = [
  'Value to convert: (1) ',
  'From(currency code): ',
  'To(currency code): ',
  'Date(YYYY-MM-DD): (latest) '
];

const getConvertedValue = async () => {
  const answers  = [];
  for (const question of questions) {
    const answer = await askQuestion(question);
    answer.trim();
    answers.push(answer);
  }
  rl.close();
  const [value, from, to, day] = answers;
  const parameters = { from, to };
  if (value !== '') parameters.value = parseFloat(value);
  if (day !== '') parameters.day = day;
  const convertedValue = await convert(parameters);
  const result = `${value} ${from} is equal ${convertedValue} ${to}`;
  console.log(result);
};

getConvertedValue();
