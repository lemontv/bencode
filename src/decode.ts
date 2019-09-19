import { DArray, Dict, IDecode, IParser } from "../";

const END = 0x65;
const NumberStart = 0x30;
const NumberEnd = 0x39;
const DictIdentify = 0x64;
const NumberIdentify = 0x69;
const ListIdentify = 0x6c;

export const decode: IDecode = (buffer) => {
    let position = 0;
    let data;

    // Start with 'i', parse number
    if (buffer[position] === NumberIdentify) {
        [data, position] = parseInteger(buffer, position + 1);
    }

    // Start with number, parse string
    if (isInteger(buffer[position])) {
        [data, position] = parseString(buffer, position + 1);
    }

    // Start with 'l', parse array
    if (buffer[position] === ListIdentify) {
        [data, position] = parseList(buffer, position + 1);
    }

    // Start with 'd', parse dict
    if (buffer[position] === DictIdentify) {
        [data, position] = parseList(buffer, position + 1);
    }

    return data;
};

export const isInteger = (char: number) => {
    return char >= NumberStart && char <= NumberEnd;
};

export const parseInteger: IParser<number> = (buffer, position) => {
    let num = 0;

    while (isInteger(buffer[position]) && buffer.length > position) {
        num = num * 10 + (buffer[position] - 0x30);
        position++;
    }

    return [num, position];
};

export const parseString: IParser<string> = (buffer, position) => {
    let num = 0;
    [num, position] = parseInteger(buffer, position);
    position++;
    const chars = buffer.slice(position, position + num).toString();
    return [chars, position + num];
};

export const parseList: IParser<DArray> = (buffer, position) => {
    const list: DArray = [];
    while (buffer[position] !== END && buffer.length > position) {
        let num = 0;

        // Start with 'i', parse number
        if (buffer[position] === NumberIdentify) {
            [num, position] = parseInteger(buffer, position + 1);
            list.push(num);
            position++;
            continue;
        }

        // Start with number, parse string
        if (isInteger(buffer[position])) {
            let chars = "";
            [chars, position] = parseString(buffer, position);
            list.push(chars);
            continue;
        }

        // Start with 'l', parse array
        if (buffer[position] === ListIdentify) {
            let subList = [];
            [subList, position] = parseList(buffer, position + 1);
            list.push(subList);
            position++;
            continue;
        }

        // Start with 'd', parse dict
        if (buffer[position] === DictIdentify) {
            let subDict = {};
            [subDict, position] = parseDict(buffer, position + 1);
            list.push(subDict);
            position++;
            continue;
        }
    }

    return [list, position];
};

export const parseDict: IParser<Dict> = (buffer, position) => {
    const dict: Dict = {};
    while (buffer[position] !== END && buffer.length > position) {
        let key = "";
        [key, position] = parseString(buffer, position);

        // Start with 'i', parse number
        if (buffer[position] === NumberIdentify) {
            let num = 0;
            [num, position] = parseInteger(buffer, position + 1);
            position++;
            dict[key] = num;
            continue;
        }

        // Start with number, parse string
        if (isInteger(buffer[position])) {
            let chars = "";
            [chars, position] = parseString(buffer, position);
            dict[key] = chars;
            continue;
        }

        // Start with 'l', parse list
        if (buffer[position] === ListIdentify) {
            let subList = [];
            [subList, position] = parseList(buffer, position + 1);
            dict[key] = subList;
            position++;
            continue;
        }

        // Start with 'd', parse dict
        if (buffer[position] === DictIdentify) {
            let subDict = {};
            [subDict, position] = parseDict(buffer, position + 1);
            dict[key] = subDict;
            position++;
            continue;
        }
    }
    return [dict, position];
};
