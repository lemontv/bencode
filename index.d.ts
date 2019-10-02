import { Decode, IDecode } from "./src/types";

declare module "@lemontv/bencode" {
    export function encode(payload: Decode): string;
    export function decode(): IDecode;
}
