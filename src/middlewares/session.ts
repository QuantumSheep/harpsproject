"use strict";

import * as dbconnection from '../services/dbconnection';
import * as session from 'express-session';
import * as expressMySQLSession from 'express-mysql-session';
import { RequestHandler } from 'express';


const MySQLStore = expressMySQLSession(session);
const sessionStore = new MySQLStore(dbconnection.options);

export const sess: RequestHandler = session({
    name: 'SSID',
    secret: ' 6*q#c]:bh/*qy#7Rp)ig)T$*L\'{1!^',
    store: sessionStore,
    resave: false,
    saveUninitialized: true
});