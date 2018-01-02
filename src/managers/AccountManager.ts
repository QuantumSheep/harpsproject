"use strict";

import { Connection } from "mysql";
import * as crypt from '../services/crypt';
import * as async from 'async';
import * as uuid from 'uuid';

export class AccountManager {
    //Change MDP
    public static change_pass(conn: Connection, secure_key: string, newpassword: string) {
        return new Promise((resolve, reject) => {
            crypt.cryptToPromise(newpassword).then((newpass_encrypted) => {
                conn.query("UPDATE users SET password=? WHERE secure_key=?", [newpass_encrypted, secure_key], (error, results, fields) => {
                    resolve(true);
                });
            });
        });
    }

    public static update_account(conn: Connection, secure_key: string, firstname?: string, lastname?: string, birthdate?: string, email?: string) {
        return new Promise((resolve, reject) => {
            let cmd = "UPDATE users SET ";
            let next = false;

            async.parallel([
                (callback) => {
                    if (firstname != null && firstname != "undefined") {
                        cmd += `${next ? "," : ""}firstname=? `;

                        next = true;

                        callback(undefined, firstname);
                    } else {
                        callback();
                    }
                },
                (callback) => {
                    if (lastname != null && lastname != "undefined") {
                        cmd += `${next ? "," : ""}lastname=? `;

                        next = true;

                        callback(undefined, lastname);
                    } else {
                        callback();
                    }
                },
                (callback) => {
                    if (birthdate != null && birthdate != "undefined") {
                        cmd += `${next ? "," : ""}birthdate=? `;

                        next = true;

                        callback(undefined, birthdate);
                    } else {
                        callback();
                    }
                },
                (callback) => {
                    if (email != null && email != "undefined") {
                        cmd += `${next ? "," : ""}email=? `;

                        next = true;

                        callback(undefined, email);
                    } else {
                        callback();
                    }
                }
            ], (err, results) => {
                if (next && results) {
                    cmd += "WHERE secure_key=?";

                    results.push(secure_key);

                    conn.query(cmd, results, (error, results, fields) => {
                        resolve(true);
                    });
                } else {
                    resolve(true);
                }
            });
        });
    }
}