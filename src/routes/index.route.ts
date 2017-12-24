'use strict'

import * as express from 'express';
import { Router } from 'express';
import IndexController from '../controllers/IndexController';

const router: Router = express.Router();

router.get('', IndexController.index);

router.get('/chat', IndexController.chat);
router.get('/plans', IndexController.plans);

router.get('/:action(register|login)', IndexController.logreg);

router.post('/register', IndexController.register_action);
router.post('/login', IndexController.login_action);

export = router;