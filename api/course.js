import request from '@/utils/request'

export default {
    coursePageCondition(query) {
        return request({
            url: '/front/course/index',
            method: 'get',
            params: query
        })
    },
    getCourseDetailById(id) {
        return request({
            url: '/front/course/detail',
            method: 'get',
            params: {
                id: id
            }
        })
    },

}