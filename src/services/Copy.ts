"use strict";

export default class Copy {
    constructor() {}

    public static object(obj: object) {
        return Object.assign({}, obj);
    }
}