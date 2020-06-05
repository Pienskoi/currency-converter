# CurrencyConverter

## Concept

A simple Node.js asynchronous currency converter based on [exchangeratesapi.io](https://exchangeratesapi.io/).

## Usage

Import [`convert` function](./index.js) and use it as a Promise.

```
convert({ value: 2, from: 'USD', to: 'JPY', day: '2020-05-25' }).then(value => {
    // handle converted value here
  })
  .catch(error => {
    // handle error here
  });
```
Day argumet should be `YYYY-MM-DD` fromat. Without it function will return value based on last currency rates api update.

## Usage example

[consoleapp.js](./consoleapp.js) is usage example made with async/await and `readline` that allows you to input parameters to convert in command line.

## Issues

Issues can be posted [here](https://github.com/Pienskoi/CurrencyConverter/issues).

## License

This project is [MIT licensed](./LICENSE).
