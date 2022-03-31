class CaseInsensitiveObject {
    constructor(previousObject) {
        const obj = new Proxy({}, {
            get: function (target, prop) {
                let key = prop;
                if (prop.toLowerCase) {
                    key = prop.toLowerCase();
                } 
    
                // If the value is an array, it is most likely that we put it there. Treat it as such.
                if (Array.isArray(target[key])) {
                    return target[key]?.[1];
                }
    
                // Otherwise, delegate to the prototype.
                return target.prototype?.[prop];
            },
            set: function (target, prop, value) {
                let key = prop;
                if (prop.toLowerCase) {
                    key = prop.toLowerCase();
                }

                return target[key] = [prop, value];

            },
            has: function(target, prop) {
                let key = prop;
                if (prop.toLowerCase) {
                    key = prop.toLowerCase();
                }

                if (key in target) {
                    return true;
                }

                return key in target.prototype;
            },
            deleteProperty: function(target, prop) {
                let key = prop;
                if (prop.toLowerCase) {
                    key = prop.toLowerCase();
                }

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