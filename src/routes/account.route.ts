"use strict";

import { Router } from 'express';
import { AccountController } from '../controllers/AccountController';

const router: Router = Router();

router.get('/', AccountController.index);

router.get('/settings', AccountController.settings);
router.get('/emails', AccountController.emails);
router.get('/security', AccountController.security);
router.get('/groups', AccountController.groups);
router.get('/companies', AccountController.companies);

router.post('/security', AccountController.changepass_action);
router.post('/settings', AccountController.changepublic_action);

export = router;