const Router = require('express').Router;
const router = new Router();
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.get('/getall', authMiddleware, userController.getAll);
router.get('/:id', userController.getOne);
router.post('/', userController.insert);
router.put('/:id', userController.update);
router.delete('/:id', userController.delete);

module.exports = router;