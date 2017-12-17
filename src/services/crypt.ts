'use strict'

import * as bcrypt from 'bcryptjs';
import config from '../config';

export function cryptToPromise(tocrypt: string, rounds = Number(config.bcrypt.rounds)): Promise<{}> {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(rounds, (err, salt) => {
            bcrypt.hash(tocrypt, salt, (err, hash) => {
                resolve(hash);
            });
        });
    });
}

export function crypt(tocrypt: string, callback = (err, result: string) => { }, rounds = Number(config.bcrypt.rounds)) {
    bcrypt.genSalt(rounds, (err, salt) => {
        bcrypt.hash(tocrypt, salt, (err, hash) => {
            callback(null, hash);
        });
    });
}

export function compare(s: string, hash: string, callback?: () => {}, progressCallback?): Promise<{}> {
    return bcrypt.compare;
}