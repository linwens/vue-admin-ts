/**
 * import axios方法，AxiosResponse，AxiosRequestConfig都是接口，包含默认的配置项
 */
import axios, { AxiosResponse, AxiosRequestConfig } from 'axios'
import { Loading, Message } from 'element-ui'
let loadingInstance: any //存放Loading实例
/**
 * 声明一些基础变量
 */
const baseURL = location.origin
const ISMOCK: boolean = true
const conmomPrams: any = {} //请求的公共参数
declare type Methods = "GET" | "OPTIONS" | "HEAD" | "POST" | "PUT" | "DELETE" | "TRACE" | "CONNECT"
//声明了传参data的类型，可以包含请求方法，参数名key是字符串,参数值value是any类型
declare interface Datas {
    method?: Methods
    [key: string]: any
}

/**
 * 声明一个HttpRequest类,包含一个请求所必要的方法，是基于axios的再封装
 */
class HttpRequest {
    public queue: any
    public constructor() {
        this.queue = {}
    }
    /**
     * 
     * @param url 销毁请求
     */
    destroy(url: string) {
        delete this.queue[url]
        if(!Object.keys(this.queue).length){
            loadingInstance.close() //hide loading
        }
    }
    // 基于axios 封装一个拦截器
    interceptors(instance: any, url?: string) {
        // 请求拦截
        instance.interceptors.request.use((config: AxiosRequestConfig) => {
            if(!Object.keys(this.queue).length){  // 为了异步请求的时候，精准控制loading?
                loadingInstance = Loading.service({}); // show loading
            }
            if(url){
                this.queue[url] = true
            }
            return config
        }, (error: any) => {
            console.error(error)
        })
        // 响应拦截
        instance.interceptors.response.use((res: AxiosResponse) => {
            if (url) { //? 请求成功删除队列中的url?
                this.destroy(url)
            }
            const { data, status } = res // 解构赋值
            if (status === 200 && ISMOCK) { return data} // mock数据直接返回
            if (status === 200 && data && data.code === 0) { return data} // 请求成功
            return requestFail(res) // 请求正常，但是后端数据异常，做统一处理
        }, (error: any) => {
            if(url){
                this.destroy(url)
            }
            console.error(error)
        })
    }
    // 一个异步的 request方法
    async request(options: AxiosRequestConfig) {
        const instance = axios.create();
        await this.interceptors(instance, options.url)
        return instance(options) // 返回配置了拦截器后的axios实例
    }
}
/**
 * 后端返回失败，统一处理
 */
const requestFail = (res: AxiosResponse) => {
    let errStr = '网络繁忙！'
    if(res.data.code === 10001){ // 如果未登录
        console.error('没有登录状态')
    }
    // ...还可以写很多别的情况
    //下面是默认处理
    return {
        err: console.error({
            code: res.data.errcode || res.data.code,
            msg: res.data.errmsg || errStr
        })
    }
}
/**
 * 实例化一个http方法
 */
const HTTP = new HttpRequest();
/**
 * 合并axios参数
 */
const conbineOptions = (_opts: any, data: Datas, method: Methods): AxiosRequestConfig => {
    let opts = _opts
    if(typeof opts === 'string') {
        opts = { url: opts}
    }
    const _data = { ...conmomPrams, ...opts.data, ...data}
    const options = {
        method: opts.method || data.method || method || 'GET',
        url: opts.url,
        header: {},
        baseURL
    }
    return options.method !== 'GET' ? Object.assign(options, { data: _data }) : Object.assign(options, { params: _data })
}
/**
 * 抛出请求方法
 */
const Api = (()=>{
    // AxiosRequestConfig | string 的写法就是ts中的联合类型
    // method: Methods = "GET" 表示参数method的类型为Methods,同时默认值为GET
    const fun = (opts: AxiosRequestConfig | string) => {
        return async (data = {}, method: Methods = "GET") => {

            const newOpts = conbineOptions(opts, data, method) //最终包装成axios可用的传参配置
            const res = await HTTP.request(newOpts);
            return res;
        }
    }

    return fun
})()

export default Api as any;


