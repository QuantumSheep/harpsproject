"use strict";

import config from '../config';
import { Request, Response } from 'express';
import { Lang } from '../interfaces/LangInterface';

// All accepted languages
export const accepted = config.lang.accepted;

// Function to get the user language and defining his cookie lang
export function get(req: Request, res: Response, modify_lang = true): string {
    let browser_lang = "";
    let lang = req.headers["accept-language"];
    
    // Check if the cookie exists and if exists, check if it's accepted as a valid lang
    if (req.cookies.lang != null && accepted.indexOf(req.cookies.lang) !== -1 && modify_lang) {
        browser_lang = req.cookies.lang;
    } else {
        // Get the country from the HTTP headers
        browser_lang = lang != null ? `${lang[0]}${lang[1]}` : config.lang.default;
        
        if (modify_lang) {
            // Defining the cookie's name and value
            res.cookie("lang", (accepted.indexOf(browser_lang) === -1 ? config.lang.default : browser_lang));
        }
    }

    return browser_lang;
}

export function getLangage(langage: string): Lang {
    return require(`../lang/${langage}`);
};