import express from 'express';
import authController from '../controllers/auth.controller';

const router = express.Router();

router.route('/signup').post(authController.signup);
router.route('/login').post(authController.login);
router.use(authController.protect);
router.route('/get-current-user').get(authController.getLoggedUser);
router.route('/logout').post(authController.logout);

export default router;
