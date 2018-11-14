/**
 * Created by zhulizhe on 2018/11/10.
 */
const userModel = require('../lib/mysql.js')
const moment = require('moment')
const md5 = require('md5')

exports.signup = async ctx => {
    let {name, password, repeatpass, avator} = ctx.request.body;
    await userModel.findDataCountByName(name).then(async result => {
        if (result[0].count >= 1) {
            // 用户存在
            ctx.body = {
                code: 500,
                message: '用户存在'
            };
        } else if (password !== repeatpass || password.trim() === '') {
            ctx.body = {
                code: 500,
                message: '两次输入的密码不一致'
            };
        } else if (avator.length === 0) {
            ctx.body = {
                code: 500,
                message: '请上传头像'
            };
        }
        else {
            let getName = Number(Math.random().toString().substr(3)).toString(36) + Date.now();
            await userModel.insertData([name, md5(password), getName + '.png', moment().format('YYYY-MM-DD HH:mm:ss')])
                .then(res => {
                    console.log('注册成功', res)
                    //注册成功
                    ctx.body = {
                        code: 200,
                        message: '注册成功'
                    };
                })
        }
    })
}