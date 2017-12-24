'use strict'

import { Lang } from '../interfaces/LangInterface';

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
    page: {
        not_found: {
            title: "Page not found",
            error: "Page not found"
        },
        forbidden: {
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
            picture: "Profile picture",
            profil: "Profile",
            admin: "Account",
            change_pass: "Modify your password",
            last_pass: "Enter your actual password",
            first_new_pass: "Enter your new password",
            secondary_new_pass: "Enter your new password a second time",
            change_name: "Modify your name",
            change_mail: "Modify your Email",
            change_birth: "Modify your birthdate",
            job_done: "Change done",
            send: "Confirm",
            ask_password: "Please enter your password",

            error_shortpass: "Your password lenght must be at least 8 chars",
        }
    }
}

export = lang;