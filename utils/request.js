import axios from 'axios'
import cookie from "js-cookie"
import {MessageBox, Message, Col} from 'element-ui'
// create an axios instance
const service = axios.create({
  baseURL: "http://localhost:81", // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

service.interceptors.request.use(
  config => {
    //debugger
    if (cookie.get('token')) {
      config.headers['Application'] = "bearer " + cookie.get('token');
    }
    return config
  },
  err => {
    return Promise.reject(err);
  })
export default service