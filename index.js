const handler = {
    get: function (target, prop, receiver) {
        const lowercase = prop.toLowerCase();
        return target[lowercase][1];
    },
    set: function (target, prop, value) {
        const lowercase = prop.toLowerCase();
        target[lowercase] = [prop, value]
    }
};

const proxy = new Proxy({}, handler);

proxy["PROP"] = 3;
console.log(proxy["prop"]); // "original value"