"use strict";

export interface Lang {
    [key: string]: {
        [key: string]: Lang | string;
    } | string;
}