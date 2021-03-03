import request from '@/utils/request'

export default {
    login(user) {
        return request({
            url: '/api/user/login',
            method: 'post',
            data: user
        })
    },
    getUserInfo() {
        return request({
            url: '/api/user/info',
            method: 'get'
        })
    },
}