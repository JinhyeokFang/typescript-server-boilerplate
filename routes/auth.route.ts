import { Router } from 'express';
import authController from '../controllers/auth.controller'

const router = Router();

router.get('/', authController.index);
router.post('/login', authController.login);
router.post('/register', authController.register);

export default router;