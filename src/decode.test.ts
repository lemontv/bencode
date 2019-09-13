import { encode } from "./encode";

describe("encode()", () => {
  test("should return object", () => {
    const obj = encode();
    expect(obj).toEqual({});
  });
});
