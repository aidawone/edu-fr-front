import request from '@/utils/request'

export default {
    getPlayAuth(videoId) {
        return request({
            url: '/vod/video/playAuth',
            method: 'get',
            params: {
                id: videoId
            }
        })
    },
}