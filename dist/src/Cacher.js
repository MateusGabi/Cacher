"use strict";
exports.__esModule = true;
/**
 * Cacher
 *
 * @author Mateus Gabi Moreira <mateusgabimoreira@gmail.com>
 */
var Cacher = /** @class */ (function () {
    function Cacher(resolver, data, interval) {
        this.data = data;
        this.interval = interval || 3600;
        this.resolver = resolver;
        /* control attributes */
        var now = new Date();
        now.setSeconds(now.getSeconds() + this.interval);
        this.expires_in = now;
        this.update_counter = 0;
    }
    /**
     * checks if data is valid
     *
     * @returns {boolean} isValid
     */
    Cacher.prototype.dataIsValid = function () {
        var now = new Date();
        if (!this.data) {
            return false;
        }
        if (this.expires_in.getTime() < now.getTime()) {
            return false;
        }
        return true;
    };
    /**
     * Get data value
     *
     * @returns {T} data
     */
    Cacher.prototype.getData = function () {
        if (!this.dataIsValid()) {
            var now = new Date();
            now.setSeconds(now.getSeconds() + this.interval);
            this.expires_in = now;
            this.data = this.resolver(this.data, ++this.update_counter);
        }
        return this.data || {};
    };
    return Cacher;
}());
exports["default"] = Cacher;
