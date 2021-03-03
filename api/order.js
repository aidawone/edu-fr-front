import request from '@/utils/request'

export default {
    addOrder(id) {
        return request({
            url: '/order/order/add',
            method: 'get',
            params: {
                id: id
            }
        })
    },
    getOrder(orderNo) {
        return request({
            url: '/order/order/detail',
            method: 'get',
            params: {
                orderNo: orderNo
            }
        })
    },
    
}