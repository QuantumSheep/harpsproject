'use strict';

import { Router } from 'express';
import { TypedObject } from '../interfaces/TypedObjectInterface';

import * as index from './index.route';
import * as account from './account.route';

let router: TypedObject<Router>;

export default router = {
    index: index,
    account: account
}