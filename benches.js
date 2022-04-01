const mine = require('./index');
const prettyMilliseconds = require('pretty-ms');
const { performance } = require('perf_hooks');
const { v4: uuidv4 } = require('uuid');

const TEST_COUNT = 100000;

const keys = new Set();
for (let i = 0; i < TEST_COUNT; ++i) {
    keys.add(uuidv4());
}

let start = performance.now();
let obj = {};
for (const key of keys) {
    obj[key] = 3;
}
for (const key of keys) {
    delete obj[key]
}
console.log("Theirs: ", prettyMilliseconds(performance.now() - start));

start = performance.now();
obj = new mine({});
for (const key of keys) {
    obj[key] = 3;
}
for (const key of keys) {
    delete obj[key]
}
console.log("Mine: ", prettyMilliseconds(performance.now() - start));