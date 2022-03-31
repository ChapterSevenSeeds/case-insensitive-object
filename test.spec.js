const CaseInsensitiveObject = require("./index");

describe("Tests", () => {
    test("Simple key assignment and retrieval", () => {
        const obj = new CaseInsensitiveObject();
        obj.HELlO = 1;
        obj.asdf = 2;

        expect(obj.hello).toBe(1);
        expect(obj.ASDF).toBe(2);

        obj.hello = 19;
        obj.ASDF = 33;

        expect(obj.HELLO).toBe(19);
        expect(obj.asdf).toBe(33);

        obj[3] = -1;
        obj[-33] = -50;

        expect(obj["3"]).toBe(-1);
        expect(obj["-33"]).toBe(-50);

        obj["QWE"] = 90;
        obj["tye"] = 100;

        expect(obj.qwe).toBe(90);
        expect(obj["qWe"]).toBe(90);
        expect(obj.TYE).toBe(100);
        expect(obj["tyE"]).toBe(100);
    });

    test("Object.assign", () => {
        const obj = new CaseInsensitiveObject();
        Object.assign(obj, { HELLO: 3, asdf: 5 });

        expect(obj.hello).toBe(3);
        expect(obj.ASDF).toBe(5);
    });

    test("Weird keys", () => {
        const obj = new CaseInsensitiveObject();
        obj[Symbol.iterator] = -33;
        obj["😊😊"] = 4;
        expect(obj[Symbol.iterator]).toBe(-33);
        expect(obj["😊😊"]).toBe(4);
    });

    test("Prototype delegation", () => {
        const obj = new CaseInsensitiveObject();
        expect(obj.toString()).toBe("[object CaseInsensitiveObject]");
        Object.preventExtensions(obj);
        expect(() => obj[3] = 3).toThrow();
    });

    test("In operator", () => {
        const obj = new CaseInsensitiveObject();
        obj["HEllO"] = {};
        expect("hello" in obj).toBe(true);
    });

    test("Key iterability with original casing", () => {
        const obj = new CaseInsensitiveObject();
        obj.a = 1;
        obj.b = 2;
        obj.C = 3;
        obj.DD = 4;

        expect(Object.keys(obj)).toStrictEqual(["a", "b", "C", "DD"]);
    });


    test("Initialize with previously existing object", () => {
        const obj2 = {
            Hello: 1,
            ASDF: 2,
            qwerty: 3
        };

        const obj1 = new CaseInsensitiveObject(obj2);

        expect(obj1.hELLO).toBe(1);
        expect(obj1['asdf']).toBe(2);
        expect(obj1.QWERTY).toBe(3);
    });

    test("Delete property", () => {
        const obj = new CaseInsensitiveObject();
        obj.ASDF = 3;

        delete obj.asdf;
        expect(obj.asdf).toBe(undefined);
    });
})