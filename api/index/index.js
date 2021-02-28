import request from '@/utils/request'

export default {
    getInfoToIndex() {
        return request({
            url: '/front/cms/index',
            method: 'get'
        })
    },
}