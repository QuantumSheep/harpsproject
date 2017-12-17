'use strict'

import * as fs from 'fs';

let config: {
    server: {
        port: number
    },
    database: {
        host: string,
        port: number,
        user: string,
        pass: string,
        name: string
    },
    lang: {
        default: string,
        accepted: string[]
    },
    bcrypt: {
        rounds: number
    }
};

config = Object.assign({}, JSON.parse(fs.readFileSync('./config.json', 'utf-8')));

export = config;