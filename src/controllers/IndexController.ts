'use strict'

import IndexManager from '../managers/IndexManager';
import IndexModel from '../models/IndexModel';
import * as validator from 'validator';
import { Request, Response } from 'express';
import * as dbconnection from '../services/dbconnection';

export default class IndexController {
    // GET function for the index page ('/')
    public static index(req, res) {
        let model = new IndexModel();

        res.render('index/index', { model: model });
    }

    // GET function for the /offers page
    public static plans(req, res) {
        let model = new IndexModel();

        res.render('index/plans', { model: model });
    }

    // GET function for /login and /register page
    public static logreg(req, res) {
        if (req.session.secure_key == null) {
            let model = new IndexModel();

            res.render(`index/${req.params.action}`, { model: model });
        } else {
            res.redirect('/');
        }
    }

    // POST function for /login action
    public static login_action(req: Request, res: Response) {
        let error = () => {
            let model = new IndexModel();

            model.login.email = req.body.email;
            model.login.error = res.locals.lang.views.login.error_credentials;

            res.render(`index/login`, { model: model });
        };

        let conn = dbconnection.getConnection();

        if (req.body.email != null && req.body.password != null && !validator.isEmpty(req.body.password) && validator.isEmail(req.body.email)) {
            IndexManager.logUser(conn, req.body.email, req.body.password).then((response) => {
                if (req.session) {
                    req.session.secure_key = response;
                }

                res.redirect('/');
            }).catch((response) => {
                error();
            });
        } else {
            error();
        }
    }

    // POST function for /register action
    public static register_action(req, res) {
        let model = new IndexModel();
        let conn = dbconnection.getConnection();

        IndexManager.checkRegisterForm(req.body.firstname, req.body.lastname, req.body.email, req.body.birthdate, req.body.password, res.locals.errors).then((errors) => {
            IndexManager.registerUser(conn, req.body.firstname, req.body.lastname, req.body.email, req.body.birthdate, res.locals.lang.name, req.body.password).then((response) => {
                res.redirect('/login');
            }).catch((error) => {
                model.register.firstname = req.body.firstname;
                model.register.lastname = req.body.lastname;
                model.register.email = req.body.email;
                model.register.birthdate = req.body.birthdate;

                if(error == "") {
                    res.locals.errors.add();
                } else {
                    res.locals.errors.add();
                }

                res.render(`index/register`, { model: model });
            });
        }).catch((errors) => {
            model.register.firstname = req.body.firstname;
            model.register.lastname = req.body.lastname;
            model.register.email = req.body.email;
            model.register.birthdate = req.body.birthdate;

            res.locals.errors = errors;

            res.render(`index/register`, { model: model });
        });
    }
}