"use strict";

import { AccountManager } from '../managers/AccountManager';
import { IndexModel } from '../models/IndexModel';
import * as validator from 'validator';
import { Request, Response } from 'express';
import * as dbconnection from '../services/dbconnection';
import * as user from '../services/user';
import * as moment from 'moment';

export class AccountController {
    // GET function for the index page ('/')
    public static index(req: Request, res: Response) {
        let model = new IndexModel();

        if (req.session && req.session.secure_key) {
            res.render('account/settings', { model: model });
        } else {
            res.render('errors/404', { model: model });
        }
    }

    // GET function for the index page ('/profile')
    public static settings(req: Request, res: Response) {
        let model = new IndexModel();

        if (req.session && req.session.secure_key) {
            res.render('account/settings', { model: model });
        } else {
            res.render('errors/404', { model: model });
        }
    }

    // GET function for the index page ('/profile')
    public static emails(req: Request, res: Response) {
        let model = new IndexModel();

        if (req.session && req.session.secure_key) {
            res.render('account/emails', { model: model });
        } else {
            res.render('errors/404', { model: model });
        }
    }

    // GET function for the index page ('/admin')
    public static security(req: Request, res: Response) {
        let model = new IndexModel();

        if (req.session && req.session.secure_key) {
            res.render('account/security', { model: model });
        } else {
            res.render('errors/404', { model: model });
        }
    }

    // GET function for the index page ('/profile')
    public static groups(req: Request, res: Response) {
        let model = new IndexModel();

        if (req.session && req.session.secure_key) {
            res.render('account/groups', { model: model });
        } else {
            res.render('errors/404', { model: model });
        }
    }

    // GET function for the index page ('/profile')
    public static companies(req: Request, res: Response) {
        let model = new IndexModel();

        if (req.session && req.session.secure_key) {
            res.render('account/companies', { model: model });
        } else {
            res.render('errors/404', { model: model });
        }
    }

    // POST function for /changepass action
    public static changepass_action(req: Request, res: Response) {
        let model = new IndexModel();
        let conn = dbconnection.getConnection();

        if (req.session && req.body.verifPassword != null && req.body.newPassword != null && req.body.password != null && req.body.newPassword.length >= 8 && req.body.verifPassword == req.body.newPassword) {
            user.check_pass_by_secure(conn, req.session.secure_key, req.body.password).then((response) => {
                if (response && req.session) {
                    AccountManager.change_pass(conn, req.session.secure_key, req.body.newPassword).then((response) => {

                        res.render('/account/security');
                    });
                } else {
                    res.locals.errors.add(res.locals.lang.views.account.security.wrongPassword);
                    
                    res.render('account/security', { model: model });
                }
            });
        } else {
            res.locals.errors.add(res.locals.lang.views.account.security.tooShortPassword);

            res.render('account/security', { model: model });
        }
    }

    // POST function for /changepublic action
    public static changepublic_action(req: Request, res: Response) {
        let model = new IndexModel();
        let conn = dbconnection.getConnection();

        if (req.session) {
            AccountManager.update_account(conn, req.session.secure_key,
                (validator.isAlphanumeric(req.body.firstname) ? req.body.firstname : null),
                (validator.isAlphanumeric(req.body.lastname) ? req.body.lastname : null),
                (validator.isISO8601(req.body.birthdate) && moment().format("YYYYMMDD") >= req.body.birthdate.replace(/-/g, '') ? req.body.birthdate : null),
                (validator.isEmail(req.body.email) ? req.body.email : null));
        }

        res.redirect(`/account/settings`);
    }
}