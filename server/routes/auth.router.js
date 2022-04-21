const Router = require('express').Router;
const router = new Router();
const authController = require('../controllers/auth.controller');

router.post('/registration', authController.registration);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.post('/activate/:link', authController.activate);
router.get('/refresh', authController.refresh);
router.get('/check', authController.check);

module.exports = router;