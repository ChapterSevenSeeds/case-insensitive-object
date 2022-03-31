# Case Insensitive Object
### By Tyson Jones
Enables the construction and manipulation of JavaScript objects whose keys are case insensitive. Built simply as a Proxy wrapper for regular case sensitive objects in which certain vital methods are intercepted and modified.

```js
import CaseInsensitiveObject from "case-insensitive-object2"

const obj = new CaseInsensitiveObject();
obj.HELLO = 3;
console.log(obj.hello); // Prints 3
```

