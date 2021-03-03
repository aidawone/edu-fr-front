import request from '@/utils/request'

export default {
    getSubjectsTree() {
        return request({
            url: '/back/subject/index',
            method: 'get'
        })
    }
}