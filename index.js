const handler = {
    get: function (target, prop, receiver) {
        const lowercase = prop.toLowerCase();
        return target[lowercase][1];
    },
    set: function (target, prop, value) {
        const lowercase = prop.toLowerCase();
        target[lowercase] = [prop, value]
    },
    ownKeys: function(target) {
        return Object.values(target).map(value => value[0]);
    }
};

const proxy = new Proxy({}, handler);

proxy["PROP"] = 1;
proxy["AsDf"] = 2;
console.log(proxy["prop"]);
console.log(proxy["asdf"]);

const asdfasdf = Object.keys(proxy)