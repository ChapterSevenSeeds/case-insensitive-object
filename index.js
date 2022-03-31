class CaseInsensitiveObject {
    originalKeyMap = {};
    constructor(previousObject) {
        const obj = new Proxy({}, {
            get: function (target, prop, receiver) {
                let key = prop;
                if (prop.toLowerCase) {
                    key = prop.toLowerCase();
                } 
    
                const lowerCaseGet = Reflect.get(target, key, receiver);
                if (lowerCaseGet == null) {
                    return Reflect.get(target, prop, receiver);
                }

                return lowerCaseGet;
            },
            set: function (target, prop, value) {
                let key = prop;
                if (prop.toLowerCase) {
                    key = prop.toLowerCase();
                }

                originalKeyMap[key] = prop;
                return target[key] = value;

            },
            has: function(target, prop) {
                let key = prop;
                if (prop.toLowerCase) {
                    key = prop.toLowerCase();
                }

                return key in target || key in target.prototype || prop in target || prop in target.prototype;
            },
            deleteProperty: function(target, prop) {
                let key = prop;
                if (prop.toLowerCase) {
                    key = prop.toLowerCase();
                }

                delete originalKeyMap[key];
                return delete target[key];
            },
            ownKeys: function (target) {
                return Object.values(target).map(value => value[0]);
            },
            getOwnPropertyDescriptor: function() {
                return {
                    enumerable: true,
                    configurable: true,
                };
            },
            defineProperty: function(target, property, attributes) {
                let key = prop;
                if (prop.toLowerCase) {
                    key = prop.toLowerCase();
                }
            }
        });

        Object.setPrototypeOf(obj, CaseInsensitiveObject);

        Object.assign(obj, previousObject);
        return obj;
    }

    toString() {
        return "[object CaseInsensitiveObject]";
    }
}

module.exports = CaseInsensitiveObject;