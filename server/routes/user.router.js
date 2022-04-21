const Router = require('express').Router;
const router = new Router();
const userController = require('../controllers/user.controller');

router.get('/', userController.getAll);
router.get('/:id', userController.getOne);
router.post('/', userController.insert);
router.put('/:id', userController.update);
router.delete('/:id', userController.delete);

module.exports = router;