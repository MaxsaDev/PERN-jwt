const Router = require('express').Router;
const router = new Router();
const dicController = require('../controllers/dic.controller');

router.get('/', dicController.getAll);


module.exports = router;