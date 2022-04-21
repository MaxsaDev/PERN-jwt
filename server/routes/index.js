const Router = require('express').Router;
const router = new Router();

const authRouter = require('./auth.router');
const userRouter = require('./auth.router');

router.use('/auth', authRouter);
router.use('/user', userRouter);

module.exports = router;