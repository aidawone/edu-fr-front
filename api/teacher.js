import request from '@/utils/request'

export default {
    getTeacherByPage(page, size) {
        return request({
            url: '/front/teacher/index',
            method: 'get',
            params: {
                page: page,
                size: size
            }
        })
    },
    getTeacherInfoById(id) {
        return request({
            url: '/front/teacher/detail',
            method: 'get',
            params: {
                id: id
            }
        })
    }

}