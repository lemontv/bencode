import { Buffer } from "buffer";
import {
    decode,
    isInteger,
    parseDict,
    parseInteger,
    parseList,
} from "../src/decode";
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

describe("parseInteger()", () => {
    it("should be able to parse an integer", () => {
        const buffer = Buffer.from("i1024e");
        expect(parseInteger(buffer, 1)).toEqual([1024, 5]);
    });

    it("should be able to parse an negative integer", () => {
        const buffer = Buffer.from("i-1024e");
        expect(parseInteger(buffer, 1)).toEqual([-1024, buffer.length - 1]);
    });
});

describe("isInteger()", () => {
    const buffer = Buffer.from("0123456789xyz");

    it("should be truthy for number", () => {
        for (let i = 0; i < 10; i++) {
            const char = buffer[i];
            expect(isInteger(char)).toBeTruthy();
        }
    });

    it("should be falsy for char", () => {
        for (let i = 10; i < 13; i++) {
            const char = buffer[i];
            expect(isInteger(char)).toBeFalsy();
        }
    });
});

describe("parseList()", () => {
    it("should return number array ", () => {
        const buffer = Buffer.from("li42ei32ee");
        expect(parseList(buffer, 1)).toEqual([[42, 32], 9]);
    });

    it("should return string array ", () => {
        const buffer = Buffer.from("l4:abcde");
        expect(parseList(buffer, 1)).toEqual([["abcd"], buffer.length - 1]);
    });

    it("should return string & number array ", () => {
        const buffer = Buffer.from("l4:abcdi444ee");
        expect(parseList(buffer, 1)).toEqual([
            ["abcd", 444],
            buffer.length - 1,
        ]);
    });

    it("should return Darray ", () => {
        const buffer = Buffer.from(
            "l4:abcdli3eei444ed3:bar4:spam3:fooi42e4:listli42eeee",
        );
        expect(parseList(buffer, 1)).toEqual([
            ["abcd", [3], 444, { bar: "spam", foo: 42, list: [42] }],
            buffer.length - 1,
        ]);
    });
});

describe("parseDict()", () => {
    it("should return Object", () => {
        const buffer = Buffer.from("d3:bar4:spam3:fooi42e4:listli42eee");
        expect(parseDict(buffer, 1)).toEqual([
            { bar: "spam", foo: 42, list: [42] },
            buffer.length - 1,
        ]);
    });
});

describe("decode()", () => {
    it("should be able to decode KRPC error message", () => {
        const buffer = Buffer.from(error.bencoded);
        expect(decode(buffer)).toEqual(error.raw);
    });

    it("should be able to decode KRPC ping message", () => {
        const queryBuffer = Buffer.from(pingQuery.bencoded);
        expect(decode(queryBuffer)).toEqual(pingQuery.raw);

        const responseBuffer = Buffer.from(pingResponse.bencoded);
        expect(decode(responseBuffer)).toEqual(pingResponse.raw);
    });

    it("should be able to decode KRPC find_node message", () => {
        const queryBuffer = Buffer.from(findNodeQuery.bencoded);
        expect(decode(queryBuffer)).toEqual(findNodeQuery.raw);

        const responseBuffer = Buffer.from(findNodeResponse.bencoded);
        expect(decode(responseBuffer)).toEqual(findNodeResponse.raw);
    });

    it("should be able to decode KRPC get_peers message", () => {
        const queryBuffer = Buffer.from(getPeersQuery.bencoded);
        expect(decode(queryBuffer)).toEqual(getPeersQuery.raw);

        const responseBuffer = Buffer.from(getPeersResponse.bencoded);
        expect(decode(responseBuffer)).toEqual(getPeersResponse.raw);

        const responseClosetNodesBuffer = Buffer.from(
            getPeersClosetNodeResponse.bencoded,
        );
        expect(decode(responseClosetNodesBuffer)).toEqual(
            getPeersClosetNodeResponse.raw,
        );
    });

    it("should be able to decode KRPC announce_peers message", () => {
        const queryBuffer = Buffer.from(announcePeersQuery.bencoded);
        expect(decode(queryBuffer)).toEqual(announcePeersQuery.raw);

        const responseBuffer = Buffer.from(announcePeersResponse.bencoded);
        expect(decode(responseBuffer)).toEqual(announcePeersResponse.raw);
    });

    it("should throw an error", () => {
        const queryBuffer = Buffer.from("xyz");
        expect(() => decode(queryBuffer)).toThrow();
    });
});
