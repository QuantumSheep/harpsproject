"use strict";

export class RowUser {
    idusers: string;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    birthdate: string;
    country: string;
    secure_key: string;
    date_created: string;
    date_updated: string;

    constructor() {
        return this;
    }

    static mapper(data?: any): RowUser {
        let user: RowUser = new RowUser();
    
        return user = {
            idusers: data.idusers ? data.idusers : null,
            firstname: data.firstname ? data.firstname : null,
            lastname: data.lastname ? data.lastname : null,
            email: data.email ? data.email : null,
            password: data.password ? data.password : null,
            birthdate: data.birthdate ? data.birthdate : null,
            country: data.country ? data.country : null,
            secure_key: data.secure_key ? data.secure_key : null,
            date_created: data.date_created ? data.date_created : null,
            date_updated: data.date_updated ? data.date_updated : null
        }
    }
}