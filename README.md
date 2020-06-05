# CurrencyConverter

## Concept

A simple Node.js asynchronous currency converter based on [exchangeratesapi.io](https://exchangeratesapi.io/).

## Usage

Import [convert function](./index.js) and use it as a Promise.

```
convert({ value: 2, from: 'USD', to: 'JPY', day: '2020-05-25' }).then(value => {
    // handle converted value here
  })
  .catch(error => {
    // handle error here
  });
```
Day argument should be `YYYY-MM-DD` format. Without that argument function will return value based on last exchange rates api update. 
Without value argument function will convert one currency unit. 

## Usage example

[consoleapp.js](./consoleapp.js) is usage example made with async/await and `readline` that allows you to input parameters for converting in command line.

## Issues

Issues can be posted [here](https://github.com/Pienskoi/CurrencyConverter/issues).

## License

This project is [MIT licensed](./LICENSE).
