import {
    encode,
    encodeDict,
    encodeInteger,
    encodeList,
    encodeString,
} from "../src/encode";

describe("encode()", () => {
    it("should be able to encode data", () => {
        const obj = { a: "b", b: 10 };
        expect(encode(obj)).toEqual("d1:a1:b1:bi10ee");
    });

    it("should be able to encode lsit", () => {
        const list = [10, "str"];
        expect(encode(list)).toEqual("li10e3:stre");
    });
});

describe("encodeDict()", () => {
    const obj = { a: "b", b: 10 };

    it("should be able to encode an list", () => {
        expect(encodeDict(obj)).toEqual("d1:a1:b1:bi10ee");
    });
});

describe("encodeInteger()", () => {
    const num = 100;

    it("should be able to encode an integer", () => {
        expect(encodeInteger(num)).toEqual(`i${num}e`);
    });
});

describe("encodeList()", () => {
    const list = [10, "str"];

    it("should be able to encode an list", () => {
        expect(encodeList(list)).toEqual("li10e3:stre");
    });
});

describe("encodeString()", () => {
    const str = "hello world!";

    it("should be able to encode an string", () => {
        expect(encodeString(str)).toEqual(`${str.length}:${str}`);
    });
});
