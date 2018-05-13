"use strict";

class Cacher {

    constructor(data, interval, resolver) {
        this.data = data
        this.interval = interval
        this.resolver = resolver

        this.expires_in = new Date().getTime() + interval
    }


    getData() {

        let now = new Date().getTime()

        if (this.expires_in < now) {

            console.log(`retrieving data from resolver because ${this.expires_in} is less than ${now}`);
            this.expires_in = now + this.interval
            this.data = this.resolver()
        }

        return this.data
    }
}


module.exports = Cacher
