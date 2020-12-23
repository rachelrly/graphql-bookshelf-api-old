const books = require('./books.json');

const sorted = books.sort((a, b) => a.rating > b.rating ? 1 : -1)

console.log(sorted)