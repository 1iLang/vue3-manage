import axios from 'axios'
import config from '../config'

class HttpRequest {
    constructor () {
        this.baseUrl = null
    }

    getInsideConfig() {//请求头公共配置项
      const config = {
          baseURL: this.baseUrl,
          // header: {}
      }
      return config
    }

    interceptors(instance) {//拦截器
      // 添加请求拦截器
      instance.interceptors.request.use(function(req){
        //在发送请求前做些什么
        return req;
      },function(error){
        //对请求错误做些什么
        console.log('请求错误:', error)
        return Promise.reject(error) 
      })

      //添加响应拦截器
      instance.interceptors.response.use(function(res){
        //对响应数据做些什么
        // console.log(res)
        if(res.status == 200 || res.data.code == 200){
          return res = res.data.code ? res.data.data : res               
        }
      },function(error){
        //对响应错误做些什么
        console.log('响应错误:', error)
        return Promise.reject(error)
      })
    }

    isMock(options){//处理moke
      let isMock = config.mock
      //如果某个请求想单独处理mock
      if (typeof options.mock !== 'undefined') isMock = options.mock
      
      //对线上环境做处理，线上不让用mock
      if (config.env == 'pro') {
        this.baseUrl = config.baseApi
      } else {
        this.baseUrl = isMock ? config.mockApi : config.baseApi
      }
    }

    request(options) {//发送请求
      const instance = axios.create()
      this.isMock(options)
      this.interceptors(instance)
      let ops = { ...this.getInsideConfig(), ...options}
      // let ops = { baseURL: this.baseUrl, ...options}
      return instance(ops)
    }
}

export default new HttpRequest()