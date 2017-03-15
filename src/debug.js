const highlightFoundText = require('./index');

const highlighted = highlightFoundText('lódż', 'to jest Miasto łÓDź w Polsce', '[', ']');

console.log(highlighted);
