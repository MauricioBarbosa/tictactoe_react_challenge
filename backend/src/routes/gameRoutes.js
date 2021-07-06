import { Router } from "express";

import GameController from '../controllers/GameController.js'

const router = new Router(); 

router.get('/', GameController.index);
router.post('/', GameController.store);
router.put('/:id', GameController.update);
router.get('/:id', GameController.show);

export default router; 
