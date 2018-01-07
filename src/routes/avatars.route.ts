"use strict";

import { Router } from 'express';
import { AvatarsController } from '../controllers/AvatarsController';

const router: Router = Router();

router.get('/:iduser', AvatarsController.findAvatar);
router.post('/update', AvatarsController.updateProfilPic);

export = router;