const router = require('koa-router')();
let auth = require('middlewares/auth')
let _ = require('lodash')

const User = require('models/user')
const Country = require('models/country')

async function getMyProfile(ctx, next){
    let user = ctx.currentUser
    user.country = await Country.findById({id: user.country_id})

    ctx.body = _.pick(user, [
        'id',
        'first_name',
        'last_name',
        'email',
        'password',
        'user_name',
        'country'
    ])
}

router.get('/me/profile', auth, getMyProfile)

module.exports = router