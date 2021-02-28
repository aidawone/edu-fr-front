import request from '@/utils/request'

export default {
    registerUser(user) {
        return request({
            url: '/center/user/register',
            method: 'post',
            data: user
        })
    },
}