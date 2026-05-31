import express from 'express';
import { UserController } from '../controllers/user.controller';

const router = express.Router();

router.post('/signup', UserController.signup);
router.post('/login', UserController.login);
router.get('/all', UserController.getAllUsers);
router.get('/:id', UserController.getSpecificUser);
router.post('/logout', UserController.logout);

export const userRoutes = router;
