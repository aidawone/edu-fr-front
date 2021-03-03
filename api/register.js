import request from '@/utils/request'

export default {
    registerUser(user) {
        return request({
            url: '/api/user/register',
            method: 'post',
            data: user
        })
    },
}