'use strict'

import { Lang } from '../interfaces/LangInterface';
import config from '../config';

let lang: Lang = {
    name: "en",
    title: "Harps - Enterprise Manager",
    menu: {
        home: "Home",
        documentation: "Documentation",
        plans: "Plans",
        signin: "Connect to my account"
    },
    input: {
        email: "E-mail address",
        password: "Password",
        firstname: "Firstname",
        lastname: "Lastname",
        birthdate: "Birthdate"
    },
    button: {
        confirm: "Confirm"
    },
    views: {
        err404: {
            title: "Page not found",
            error: "Page not found"
        },
        err403: {
            title: "Forbidden",
            error: "Forbidden"
        },
        index: {
            title: "Home"
        },
        login: {
            title: "Login",
            header: "Login to your account",
            login: "Login",
            joinus: "Want to make a group?",
            signup: "Sign up",
            error_credentials: "Bad credentials, check your informations"
        },
        register: {
            title: "Sign-up",
            header: "Create a new account",
            register: "Register",
            alreadyregistred: "Already registred?",
            login: "Login",
            error_email: "This email is already used",
            error_notvalid: "The informations you sended are not valids"
        },
        plans: {
            title: "Plans",
            header: "Choose your plan"
        },
        account: {
            all: {
                job_done: "Change done",
            },
            companies: {
                title: "My companies",
            },
            emails: {
                title: "My emails",
            },
            groups: {
                title: "Mes groupes",
            },
            security: {
                title: "Account's security",
                changePass: "Change your password",
                oldPass: "Old password",
                newPass: "New password",
                newPass2: "Retype the new password",
                wrongPassword: "Wrong old password.",
                tooShortPassword: "The new password is too short, 8 characters minimum required."
            },
            settings: {
                title: "Account's settings",
                basics: "Basic informations",
                picture: "Profile's picture",
                maxPPWeight: `The image should not be more than ${config.file.maxWeight} MB.`
            }
        }
    }
}

export = lang;