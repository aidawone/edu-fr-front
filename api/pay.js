import request from '@/utils/request'

export default {
    //生成二维码
    generateQrCode(orderNo) {
        return request({
            url: '/order/pay/qrcode',
            method: 'get',
            params: {
                orderNo: orderNo
            }
        })
    },
    //根据订单号返回订单状态
    getCodeByOrderNo(code) {
        return request({
            url: '/order/pay/code',
            method: 'get',
            params: {
                orderNo: code
            }
        })
    },

}