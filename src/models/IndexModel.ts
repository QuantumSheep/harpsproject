"use strict";

export class IndexModel {
    login: {
        email: string,
        error: string
    };
    register: {
        firstname: string,
        lastname: string,
        email: string,
        birthdate: string,
        error: string
    }

    constructor() {
        this.login = {
            email: "",
            error: ""
        };
        
        this.register = {
            firstname: "",
            lastname: "",
            email: "",
            birthdate: "",
            error: ""
        }
    }
}