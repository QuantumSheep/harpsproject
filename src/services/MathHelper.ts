"use strict";

export default class MathHelper {
    constructor() { }

    public static getRandom(): number {
        return Math.random();
    }

    public static getRandomArbitrary(min, max): number {
        return Math.random() * (max - min) + min;
    }

    public static getRandomInt(min, max): number {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    public static getRandomIntInclusive(min, max): number {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}