
const Cacher = require('./src/Cacher')

const resolver = () => `data`

let cache = new Cacher('some-data', 3600, resolver)

console.log(`init`);

setInterval(function () {
    console.log(cache.getData())
}, 600);

// console.log(cache);
