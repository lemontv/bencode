import { Decode, Dict } from "./types";

export const encode = (payload: Decode): string => {
    if (typeof payload === "string") {
        return encodeString(payload);
    }

    if (typeof payload === "number") {
        return encodeInteger(payload);
    }

    if (Array.isArray(payload)) {
        return encodeList(payload);
    }

    if (typeof payload === "object") {
        return encodeDict(payload);
    }

    throw new Error("No a validate data!");
};

export const encodeInteger = (num: number): string => {
    return `i${num}e`;
};

export const encodeString = (str: string): string => {
    return `${str.length}:${str}`;
};

export const encodeList = (list: Decode[]): string => {
    const str = list.reduce((acc, val) => {
        return acc + encode(val);
    }, "");

    return `l${str}e`;
};

export const encodeDict = (dict: Dict): string => {
    const str = Object.keys(dict)
        .sort()
        .reduce((acc, key) => {
            const val = dict[key];
            return acc + `${encodeString(key)}${encode(val)}`;
        }, "");

    return `d${str}e`;
};
