class CaseInsensitiveObject {
    toString() {
        return "[object CaseInsensitiveObject]";
    };
}

module.exports = function(previousObject) {
    const originalKeyMap = {};
    const proxy = new Proxy(new CaseInsensitiveObject(), {
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
        set: function (target, prop, value, receiver) {  
            return Reflect.set(target, prop, value, receiver);
        },
        has: function(target, prop) {
            let key = prop;
            if (prop.toLowerCase) {
                key = prop.toLowerCase();
            }
    
            return Reflect.has(target, key) || Reflect.has(target, prop);
        },
        deleteProperty: function(target, prop) {
            let key = prop;
            if (prop.toLowerCase) {
                key = prop.toLowerCase();
            }
    
            Reflect.deleteProperty(originalKeyMap, key);
            return Reflect.deleteProperty(target, key);
        },
        ownKeys: function (target) {
            return Object.keys(target).map(value => originalKeyMap[value]);
        },
        getOwnPropertyDescriptor: function(target, prop) {
            let key = prop;
            if (prop.toLowerCase) {
                key = prop.toLowerCase();
            }
    
            if (key in target) {
                return Reflect.getOwnPropertyDescriptor(target, key);
            }
    
            return Reflect.getOwnPropertyDescriptor(target, prop);
        },
        defineProperty: function(target, prop, attributes) {
            let key = prop;
            if (prop.toLowerCase) {
                key = prop.toLowerCase();
            }
    
            Reflect.defineProperty(originalKeyMap, key, {
                ...attributes,
                value: prop
            });
    
            return Reflect.defineProperty(target, key, attributes);
        }
    });

    Object.assign(proxy, previousObject);

    return proxy;
}