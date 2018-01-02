"use strict";

export default interface DBConnectionOptions {
    host: string,
    port?: number,
    user: string,
    password?: string,
    database?: string
}