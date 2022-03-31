# Case Insensitive Object
### By Tyson Jones
Enables the construction and manipulation of JavaScript objects whose keys are case insensitive. Built simply as a Proxy wrapper for regular case sensitive objects in which certain vital methods are intercepted and modified.

```js
import CaseInsensitiveObject from "case-insensitive-object2"

const obj = new CaseInsensitiveObject();
obj.HELLO = 3;
console.log(obj.hello); // Prints 3
```

Supports all the usual `Object` functions.
```js
const obj = new CaseInsensitiveObject();
const oldObj = { HELLO: 3 };
Object.assign(obj, oldObj);
console.log(obj.hello); // Prints 3
```
```js
const obj = new CaseSensitiveObject();
Object.preventExtensions(obj);
obj.HELLO = 3; // Throws an exception
```

Retains the original keys.
```js
const obj = new CaseSensitiveObject();
obj.ASDF = 1;
obj.qWeRt = 2;

console.log(Object.keys(obj)); // Prints ["ASDF", "qWeRt"]
```

Can be initialized with a previous object.
```js
const obj = new CaseInsensitiveObject( { HELLO: 3 } );
console.log(obj.hello); // Prints 3