"use strict";

import { Lang } from "./LangInterface";
import { ErrorHandler } from "../services/ErrorHandler";

export interface Locals {
    lang: Lang,
    errors: ErrorHandler,
    config: object,
    csrfToken?: string
}