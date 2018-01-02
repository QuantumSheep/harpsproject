"use strict";

import * as bcrypt from 'bcryptjs';
import config from '../config';

export function cryptToPromise(tocrypt: string, rounds: number = config.bcrypt.rounds): Promise<string> {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(rounds, (err, salt) => {
            bcrypt.hash(tocrypt, salt, (err, hash) => {
                resolve(hash);
            });
        });
    });
}

export function crypt(tocrypt: string, callback = (err: any, result: string) => { }, rounds: number = config.bcrypt.rounds): void {
    bcrypt.genSalt(rounds, (err, salt) => {
        bcrypt.hash(tocrypt, salt, (err, hash) => {
            callback(null, hash);
        });
    });
}

export function compare(s: string, hash: string): Promise<boolean> {
    return bcrypt.compare(s, hash);
}