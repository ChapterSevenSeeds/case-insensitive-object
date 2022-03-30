const handler = {
    get: function (target, prop) {
        let lowercase;
        if (prop.toLowerCase) {
            lowercase = prop.toLowerCase();
        }

        if (Array.isArray(target[prop])) {
            return target.actual[lowercase]?.[1];
        } else if (typeof(target.prototype[prop]) === "function") {
            const returnFunction = target.prototype[prop].bind(target);
            return returnFunction;
        }
    },
    set: function (target, prop, value) {
        const lowercase = prop.toLowerCase();
        target.actual[lowercase] = [prop, value];
        target.pretty[prop] = value;
        return true;
    },
    ownKeys: function (target) {
        return Object.getOwnPropertyNames(target.pretty);
    },
    getOwnPropertyDescriptor: function() {
        return {
            enumerable: true,
            configurable: true,
        };
    }
};

module.exports = class CaseInsensitiveObject extends Object {
    proxy;
    constructor() {
        super();
        this.proxy = new Proxy({
            actual: {},
            pretty: {}
        }, handler);

        Object.setPrototypeOf(this.proxy, CaseInsensitiveObject);

        return this.proxy;
    }

    /* toString() {
        return "d"
    } */

    [Symbol.toPrimitive](type) {
        return this.pretty.toString();
    }
}