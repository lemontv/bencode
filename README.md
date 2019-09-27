# BitTorrent bencode encode/decode

[![CircleCI](https://img.shields.io/circleci/build/github/lemontv/bencode)](https://circleci.com/gh/lemontv/bencode)
[![Coveralls](https://img.shields.io/coveralls/github/lemontv/bencode)](https://coveralls.io/github/lemontv/bencode)
![Typscript](https://img.shields.io/github/languages/top/lemontv/bencode)
![Dependences](https://img.shields.io/david/lemontv/bencode)
![License](https://img.shields.io/npm/l/@lemontv/bencode)
![Version](https://img.shields.io/npm/v/@lemontv/bencode)

## Description
BitTorrent DHT KRPC protocol bencode ([BEP 005](https://www.bittorrent.org/beps/bep_0005.html)) utils function write in typescript.

## Installation
### NPM:

```
$ npm install @lemontv/bencode
```

## Usage

```
import { encode, decode} from '@lemontv/bencode';

const request = encode({"t":"aa", "y":"q", "q":"ping", "a":{"id":"abcdefghij0123456789"}});

const response = decode(Buffer.from("d1:ad2:id20:abcdefghij0123456789e1:q4:ping1:t2:aa1:y1:qe"));
```