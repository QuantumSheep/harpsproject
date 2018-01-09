"use strict";

export default interface Config {
    env: string,
    server: {
        port: number
    },
    database: {
        host: string,
        port: number,
        user: string,
        pass: string,
        name: string
    },
    lang: {
        default: string,
        accepted: string[]
    },
    directories: {
        avatars: string
    },
    bcrypt: {
        rounds: number
    }
}