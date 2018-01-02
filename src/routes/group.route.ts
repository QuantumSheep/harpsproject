"use strict";

import { Router } from 'express';
import { GroupController } from '../controllers/GroupController';

const router: Router = Router();

router.get('', GroupController.index);

router.get('/new', GroupController.newGroup);

export = router;