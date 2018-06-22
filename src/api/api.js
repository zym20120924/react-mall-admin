import axios from 'axios';
import { message } from 'antd';
const baseURL = ''

/*
 * method {String} 接口名称
 * params {Object} 传入参数
 * config {Object} 配置
 */
const Request = (method,params = {}, {
    showWait = true, //是否需要显示等待
    interceptData = true, //是否需要拦截数据，返回对象里如果status !== 200,则拒绝
    errorToast = true, //是否需要提示错误
    timeout = 10000, //超时（毫秒）
    contentType = 'application/json', //请求头内容类型 默认'application/json'
    type = 'post', //请求类型
    url = baseURL, //请求地址
    waitMessage = "加载中...",
} = {}) => {
    // 创建axios实例
    const AxiosRequest = axios.create({
        baseURL: url,
        timeout: 10 * 1000,
    })
    // 初始化默认post header
    axios.defaults.headers.post['Content-Type'] = contentType;

    // 添加请求拦截器
    AxiosRequest.interceptors.request.use(function (config) {
        // 在发送请求之前做些什么
        if(showWait) {
            message.loading(waitMessage,2.5);
        }
        return config;
    }, function (error) {
        // 对请求错误做些什么
        message.destroy()
        return Promise.reject(error);
    });

    // 添加响应拦截器
    AxiosRequest.interceptors.response.use(function (response) {
        // 对响应数据做点什么
        message.destroy()
        return response;
    }, function (error) {
        // 对响应错误做点什么
        message.destroy()
        return Promise.reject(error);
    });

    //成功回调
    const success = res => {
        let result = res.data; //接口返回的数据
        if(interceptData) {
            if(result && 200 !== res.status) {
                //接口返回错误的数据状态了
                return Promise.reject(result);
            }
        }
        return Promise.resolve(result);

    };

    //失败回调
    const fail = error => {
        //是否需要提示错误
        errorToast && message.warning('服务器繁忙，请稍后再试');
        return Promise.reject(error);
    };

    if("application/x-www-form-urlencoded" === contentType) {
        //FORM表单提交，需转换参数
        let newParams  = new URLSearchParams();
        for(let key in params) {
            newParams.append(key,params[key])
        }
        params = newParams;
    }

    if("get" === type.toLowerCase()) {
        return AxiosRequest.get(method, {
            params: params
        }).then(success).catch(fail);
    } else {
        return AxiosRequest.post(method, params).then(success).catch(fail);
    }
}



//登录
export const requestLogin = (params,config) => {return Request(`/manage/user/login.do`, params, config)};

//
