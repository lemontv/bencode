import {
    encode,
    encodeDict,
    encodeInteger,
    encodeList,
    encodeString,
} from "../src/encode";
import {
    announcePeersQuery,
    announcePeersResponse,
    error,
    findNodeQuery,
    findNodeResponse,
    getPeersClosetNodeResponse,
    getPeersQuery,
    getPeersResponse,
    pingQuery,
    pingResponse,
} from "./data";

describe("encode()", () => {
    it("should be able to encode KRPC error message", () => {
        expect(encode(error.raw)).toEqual(error.bencoded);
    });

    it("should be able to encode KRPC ping message", () => {
        expect(encode(pingQuery.raw)).toEqual(pingQuery.bencoded);
        expect(encode(pingResponse.raw)).toEqual(pingResponse.bencoded);
    });

    it("should be able to encode KRPC find_node message", () => {
        expect(encode(findNodeQuery.raw)).toEqual(findNodeQuery.bencoded);
        expect(encode(findNodeResponse.raw)).toEqual(findNodeResponse.bencoded);
    });

    it("should be able to encode KRPC get_peers message", () => {
        expect(encode(getPeersQuery.raw)).toEqual(getPeersQuery.bencoded);
        expect(encode(getPeersResponse.raw)).toEqual(getPeersResponse.bencoded);
        expect(encode(getPeersClosetNodeResponse.raw)).toEqual(
            getPeersClosetNodeResponse.bencoded,
        );
    });

    it("should be able to encode KRPC announce_peers message", () => {
        expect(encode(announcePeersQuery.raw)).toEqual(
            announcePeersQuery.bencoded,
        );
        expect(encode(announcePeersResponse.raw)).toEqual(
            announcePeersResponse.bencoded,
        );
    });
});

describe("encodeDict()", () => {
    const obj = { a: "b", b: 10 };

    it("should be able to encode an list", () => {
        expect(encodeDict(obj)).toEqual("d1:a1:b1:bi10ee");
    });
});

describe("encodeInteger()", () => {
    it("should be able to encode an integer", () => {
        const num = 1024;
        expect(encodeInteger(num)).toEqual(`i${num}e`);
    });

    it("should be able to encode a negative integer", () => {
        const num = -1024;
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
