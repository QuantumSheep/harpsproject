"use strict";

import { Connection } from "mysql";
import * as crypt from '../services/crypt';
import * as moment from 'moment';
import * as async from 'async';
import * as uuidv4 from 'uuid/v4';
import * as uuidv5 from 'uuid/v5';
import * as validator from 'validator';
import { ErrorHandler } from '../services/ErrorHandler';

export class IndexManager {
    public static checkRegisterForm(firstname, lastname, email, birthdate, password, errors: ErrorHandler): Promise<ErrorHandler> {
        return new Promise((resolve, reject) => {
            async.parallel([
                (callback) => {
                    if(firstname == null || !validator.isAlphanumeric(firstname)) {
                        errors.add("Firstname is unvalid");
                    }
                    
                    callback();
                },
                (callback) => {
                    if(lastname == null || !validator.isAlphanumeric(lastname)) {
                        errors.add("Lastname is unvalid");
                    }
                    
                    callback();
                },
                (callback) => {
                    if(email == null || !validator.isEmail(email)) {
                        errors.add("Email is unvalid");
                    }
                    
                    callback();
                },
                (callback) => {
                    if(birthdate == null || !validator.isISO8601(birthdate)) {
                        errors.add("Birthdate is unvalid");
                    } else {
                        if(moment().format('YYYY/MM/DD') < moment(birthdate).format('YYYY/MM/DD')) {
                            errors.add("The birthdate must be in the past");
                        }
                    }
                    
                    callback();
                },
                (callback) => {
                    if(password == null || password.length == 0) {
                        errors.add("You need to choose a password");
                    }
    
                    callback();
                }
            ], (err, results) => {
                if(errors.messages.length > 0) {
                    reject(errors);
                } else {
                    resolve();
                }
            });
        });
    }

    public static registerUser(conn, firstname, lastname, email, birthdate, country, password): Promise<boolean> {
        return new Promise((resolve, reject) => {
            conn.query("SELECT email FROM users WHERE email=?", email, (error, results, fields) => {
                if (error) reject(error);

                if (results[0] == null) {
                    async.parallel({
                        password: (callback) => {
                            crypt.crypt(password, (err, result) => {
                                callback(err, result);
                            });
                        },
                        secure_key: (callback) => {
                            crypt.crypt(uuidv5(email, uuidv4()), (err, result) => {
                                callback(err, result);
                            });
                        }
                    }, (err, results) => {
                        new Promise((resolve, reject) => {
                            resolve([
                                uuidv4(),
                                firstname,
                                lastname,
                                email,
                                results.password,
                                birthdate,
                                country,
                                results.secure_key,
                                moment().format('YYYY/MM/DD HH:mm:ss'),
                                moment().format('YYYY/MM/DD HH:mm:ss')
                            ]);
                        }).then((query_config) => {
                            conn.query("INSERT INTO users VALUES(?,?,?,?,?,?,?,?,?,?)", query_config, (error, results, fields) => {
                                if (error) reject(error);
                                resolve(true);
                            });
                        });
                    });
                } else {
                    reject("exists");
                }
            });
        });
    }

    public static logUser(conn: Connection, email: string, password: string): Promise<string | boolean> {
        return new Promise((resolve, reject) => {
            conn.query("SELECT password, secure_key FROM users WHERE email=?", email, (error, results, fields) => {
                if (error) reject(error);

                if (results[0] != null && results[0].password != null) {
                    crypt.compare(password, results[0].password).then((response: boolean) => {
                        if (response) {
                            resolve(results[0].secure_key);
                        } else {
                            reject(false);
                        }
                    });
                } else {
                    reject(false);
                }
            });
        });
    }
}