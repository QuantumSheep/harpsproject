"use strict";

import * as uuidv4 from 'uuid/v4';
import * as uuidv5 from 'uuid/v5';

export function random(callback = (uuid: string) => {}): string {
    let uuid = uuidv4();

    callback(uuid);

    return uuid;
};

export function namespace (str: string, callback = (uuid: string) => {}): string {
    let uuid = uuidv5(str, uuidv4());

    callback(uuid);

    return uuid;
};