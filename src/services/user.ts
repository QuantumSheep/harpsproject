'use strict'

import * as crypt from './crypt';
import * as userEntity from '../entities/user.entity';
import { Connection, FieldInfo, MysqlError } from 'mysql';
import { RowUser } from '../entities/user.entity';

export function get_by_secure(conn: Connection, secure_key: string): Promise<RowUser> {
    return new Promise((resolve, reject) => {
        conn.query("SELECT secure_key, firstname, lastname, birthdate, email FROM users WHERE secure_key=?", secure_key, (err: MysqlError | null, results?: any, fields?: FieldInfo[] | undefined): void => {
            if (err) throw err;

            resolve(userEntity.mapper(results[0]));
        });
    });
};

export function check_pass_by_secure(conn: Connection, secure_key: string, password: string): Promise<{}> {
    return new Promise((resolve, reject) => {
        conn.query("SELECT password FROM users WHERE secure_key=?", secure_key, (error, results, fields) => {
            if (error) throw error;

            if(results[0] != null && results[0].password != null) {
                crypt.compare(password, results[0].password).then((response) => {
                    resolve(response);
                });
            }
        });
    });
};