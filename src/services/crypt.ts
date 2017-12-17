'use strict'

import * as bcrypt from 'bcryptjs';
import * as config from './config';

export const cryptToPromise = (tocrypt: string, rounds = Number(config.bcrypt.rounds)): Promise<{}> => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(rounds, (err, salt) => {
            bcrypt.hash(tocrypt, salt, (err, hash) => {
                resolve(hash);
            });
        });
    });
};

export const crypt = (tocrypt: string, callback = (err, result: string) => {}, rounds = Number(config.bcrypt.rounds)) => {
    bcrypt.genSalt(rounds, (err, salt) => {
        bcrypt.hash(tocrypt, salt, (err, hash) => {
            callback(null, hash);
        });
    });
};

compare = bcrypt.compare;
export declare let compare: (s: string, hash: string, callback?: () => {}, progressCallback?) => Promise<{}>;