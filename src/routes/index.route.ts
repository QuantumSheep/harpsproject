"use strict";

import { Router } from 'express';
import { IndexController } from '../controllers/IndexController';

const router: Router = Router();

router.get('', IndexController.index);

router.get('/plans', IndexController.plans);

router.get('/:action(register|login)', IndexController.logreg);

router.post('/register', IndexController.register_action);
router.post('/login', IndexController.login_action);

export = router;