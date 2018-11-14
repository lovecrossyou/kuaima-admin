/**
 * Created by zhulizhe on 2018/11/10.
 */
const router = require('koa-router')();
const controller = require('../controller/user')

router.post('/user/signup',controller.signup)

module.exports = router;