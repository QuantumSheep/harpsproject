"use strict";

import config from '../config';
import * as mysql from 'mysql';
import { Connection } from 'mysql';
import DBConnectionOptions from '../interfaces/DBConnectionOptionsInterface';

export const connection = mysql;
export const options: DBConnectionOptions = {
    host: config.database.host,
    port: config.database.port,
    user: config.database.user,
    password: config.database.pass,
    database: config.database.name
};

export function getConnection(dboptions: DBConnectionOptions = options): Connection {
    return connection.createConnection(options);
}