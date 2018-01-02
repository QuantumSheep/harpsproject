"use strict";

import { TypedObject } from '../interfaces/TypedObjectInterface';
import { Router } from 'express';

import * as index from './index.route';
import * as account from './account.route';
import * as group from './group.route';

let router: TypedObject<Router>;

export default router = {
    index: index,
    account: account,
    group: group
}