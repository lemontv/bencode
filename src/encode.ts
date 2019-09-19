import { Decode, Dict } from "..";

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

    return encodeDict(payload);
};

export const encodeInteger = (num: number): string => {
    return `i${num}e`;
};

export const encodeString = (str: string): string => {
    return `${str.length}:${str}e`;
};

export const encodeList = (list: Decode[]): string => {
    const str = list.reduce((acc, val) => {
        if (typeof val === "string") {
            return acc + encodeString(val);
        }

        if (typeof val === "number") {
            return acc + encodeInteger(val);
        }

        if (Array.isArray(val)) {
            return acc + encodeList(val);
        }

        return acc + encodeDict(val);
    }, "");

    return `l${str}e`;
};

export const encodeDict = (dict: Dict): string => {
    const str = Object.keys(dict).reduce((acc, key) => {
        const val = dict[key];

        if (typeof val === "string") {
            return acc + `${encodeString(key)}:${encodeString(val)}`;
        }

        if (typeof val === "number") {
            return acc + `${encodeString(key)}:${encodeInteger(val)}`;
        }

        if (Array.isArray(val)) {
            return acc + `${encodeString(key)}:${encodeList(val)}`;
        }

        return acc + `${encodeString(key)}:${encodeDict(val)}`;
    }, "");

    return `d${str}e`;
};
