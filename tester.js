const CaseInsensitiveObject = require("./index");

const asdf = new CaseInsensitiveObject();
asdf["Asdf"] = 3;
console.log(asdf["ASDF"]);

console.log(`${asdf}`);