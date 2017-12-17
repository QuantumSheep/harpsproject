'use strict'

import * as config from './config';
import { Connection } from 'mysql';
import * as mysql from 'mysql';

const connection = mysql,
    options = {
        host: config.database.host,
        port: config.database.port,
        user: config.database.user,
        password: config.database.pass,
        database: config.database.name
    };

class Database {
    constructor() { }

    // Get the connection variable to the database
    static get_connection(): Connection {
        return connection.createConnection(options);
    }

    static get_options() {
        return options;
    }
}

module.exports = Database;