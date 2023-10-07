import { Router } from 'express';
import * as UserController from '../controllers/UserController.js'

const router = new Router();

router.get('/', UserController.getUsers);

export default router;