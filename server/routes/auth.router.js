const Router = require('express').Router;
const router = new Router();
const authController = require('../controllers/auth.controller');
const {body} = require('express-validator');//функція body для валідації запитів

router.post('/registration', body('email').isEmail(),body('password').isLength({min: 4, max: 32}),authController.registration);
router.get('/login', authController.login);
router.post('/logout', authController.logout);
router.get('/activate/:link', authController.activate);
router.get('/refresh', authController.refresh);
router.get('/check', authController.check);

module.exports = router;