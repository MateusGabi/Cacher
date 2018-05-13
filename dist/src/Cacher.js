"use strict";
exports.__esModule = true;
var Cacher = /** @class */ (function () {
    function Cacher(data, interval, resolver) {
        this.data = data;
        this.interval = interval;
        this.resolver = resolver;
        this.expires_in = new Date().getTime() + interval;
    }
    Cacher.prototype.getData = function () {
        var now = new Date().getTime();
        if (this.expires_in < now) {
            console.log("retrieving data from resolver because " + this.expires_in + " is less than " + now);
            this.expires_in = now + this.interval;
            this.data = this.resolver();
        }
        return this.data;
    };
    return Cacher;
}());
exports["default"] = Cacher;
