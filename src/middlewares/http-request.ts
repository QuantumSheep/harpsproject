"use strict";

import { Response, Request, NextFunction } from "express";

import * as localization from '../services/localization';
import * as user from '../services/user';
import * as moment from 'moment';

import view_config from '../services/view-config';

import * as dbconnection from '../services/dbconnection';
import { Connection } from "mysql";
import { RowUser } from "../entities/user.entity";
import { ErrorHandler } from "../services/ErrorHandler";
import { Locals } from "../interfaces/LocalsInterface";

export function load_data(req: Request, res: Response, callback: Function): void {
    // Auto-langages support
    let language = localization.getLangage(localization.get(req, res));

    // Defining response content type to html
    res.setHeader('Content-Type', 'text/html');

    // Defining the language variable for the response
    let locals: Locals = {
        lang: language,
        errors: new ErrorHandler(),
        config: JSON.parse(JSON.stringify(view_config)),
        csrfToken: req.csrfToken(),
    };

    res.locals = locals;

    // Pre-Defining the birthdate
    res.locals.isBirthdate = false;

    let conn: Connection = dbconnection.getConnection();

    // Checking if a session is open
    if (req.session != null && req.session.secure_key != null) {
        // Getting the user data from his secure key
        user.get_by_secure(conn, req.session.secure_key).then((data) => {
            // Defining account data as the new data
            res.locals.account = data;

            // Get the parsed version of birthdate
            res.locals.account.birthdate = moment(data.birthdate).format('YYYY-MM-DD');

            // Checking if today is the user's birthdate
            res.locals.isBirthdate = res.locals.account.birthdate == moment().format('YYYY-MM-DD');

            // Going to the next routing method (Routes)
            callback();
        }).catch(() => {
            // Removing the wrong secure key from session
            if(req.session) {
                req.session.secure_key = null;
            }

            // Defining account data as the actual session
            res.locals.account = {};

            // Going to the next routing method (Routes)
            callback();
        });
    } else {
        // Removing the wrong secure key from session
        if(req.session) {
            req.session.secure_key = null;
        }

        // Defining account data as the actual session
        res.locals.account = {};

        // Going to the next routing method (Routes)
        callback();
    }
};

export function load(req: Request, res: Response, next: NextFunction): void {
    // Checking if an action is present
    if (req.query.action != null) {
        // Logout action
        if (req.query.action == "logout" && req.session) {
            // Destroy all session objects
            req.session.destroy((err) => {
                if (err) throw err;
            });

            // Redirecting to the path without the query string
            res.redirect(req.path);
        } else {
            load_data(req, res, () => {
                next();
            });
        }
    } else {
        load_data(req, res, () => {
            next();
        });
    }
};

export function error(err: any, req: Request, res: Response, next: NextFunction): void {
    if (err.code === "EBADCSRFTOKEN") {
        load_data(req, res, () => {
            res.status(403);
            res.render('errors/403');
        });
    } else {
        return next(err);
    }
};