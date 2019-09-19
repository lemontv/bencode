export type IDecode = (buffer: Buffer) => Decode | undefined;

export type IParser<T> = (b: Buffer, p: number) => [T, number];

export interface Dict {
    [key: string]: Decode;
}

export interface DArray extends Array<Decode> {}

export type Decode = number | string | DArray | Dict;
