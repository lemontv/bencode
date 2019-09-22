import { DArray, Decode, Dict, IDecode, IParser } from "./types";

const END = 0x65;
const NumberStart = 0x30;
const NumberEnd = 0x39;
const DictIdentify = 0x64;
const NumberIdentify = 0x69;
const NagetiveIdentify = 0x2d;
const ListIdentify = 0x6c;

export const decode: IDecode = (buffer, position = 0) => {
    const [data] = parse(buffer, position);

    return data;
};

export const parse: IParser<Decode> = (buffer, position) => {
    // Start with 'i', parse number
    if (buffer[position] === NumberIdentify) {
        return parseInteger(buffer, position + 1);
    }

    // Start with number, parse string
    if (isInteger(buffer[position])) {
        return parseString(buffer, position);
    }

    // Start with 'l', parse array
    if (buffer[position] === ListIdentify) {
        return parseList(buffer, position + 1);
    }

    // Start with 'd', parse dict
    if (buffer[position] === DictIdentify) {
        return parseDict(buffer, position + 1);
    }

    throw new Error("No a validate data!");
};

export const isInteger = (char: number) => {
    return char >= NumberStart && char <= NumberEnd;
};

export const parseInteger: IParser<number> = (buffer, position) => {
    let num = 0;
    let flag = 1;

    if (buffer[position] === NagetiveIdentify) {
        flag = -1;
        position++;
    }

    while (isInteger(buffer[position]) && buffer.length > position) {
        num = num * 10 + (buffer[position] - 0x30);
        position++;
    }

    return [num * flag, position];
};

export const parseString: IParser<string> = (buffer, position) => {
    let num = 0;
    [num, position] = parseInteger(buffer, position);
    position++;
    const chars = buffer.slice(position, position + num).toString();
    return [chars, position + num - 1];
};

export const parseList: IParser<DArray> = (buffer, position) => {
    const list: DArray = [];

    while (buffer[position] !== END && buffer.length > position) {
        let data: Decode;
        [data, position] = parse(buffer, position);
        list.push(data);
        position++;
        continue;
    }

    return [list, position];
};

export const parseDict: IParser<Dict> = (buffer, position) => {
    const dict: Dict = {};
    while (buffer[position] !== END && buffer.length > position) {
        let key = "";
        let data: Decode;

        [key, position] = parseString(buffer, position);
        position++;

        [data, position] = parse(buffer, position);
        dict[key] = data;
        position++;
        continue;
    }
    return [dict, position];
};
