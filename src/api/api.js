import axios from 'axios';
import { message } from 'antd';
const baseURL = ''

/*
 * method {String} 接口名称
 * params {Object} 传入参数
 * config {Object} 配置
 */
const Request = (method,params = {}, {
    showWait = false, //是否需要显示等待
    interceptData = true, //是否需要拦截数据，返回对象里如果status !== 200,则拒绝
    errorToast = true, //是否需要提示错误
    timeout = 10*1000, //超时（毫秒）
    contentType = 'application/x-www-form-urlencoded', //请求头内容类型 默认'application/json'
    type = 'post', //请求类型
    url = baseURL, //请求地址
    waitMessage = "加载中...",
} = {}) => {
    // 创建axios实例
    const AxiosRequest = axios.create({
        baseURL: url,
        timeout: timeout,
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
        return AxiosRequest.get(method, { params: params }).then(success).catch(fail);
    } else {
        return AxiosRequest.post(method, params).then(success).catch(fail);
    }
}



//登录
export const requestLogin = params => Request(`/manage/user/login.do`, params);

//统计用户、商品、订单数量
export const requestBaseCount = params => Request(`/manage/statistic/base_count.do`, params);

//商品类别
export const requestProductList = params => Request(`/manage/product/list.do`, params);

//商品搜索
export const searchProductList = params => Request(`/manage/product/search.do`, params);

//商品上下架
export const setSaleStatus = params => Request(`/manage/product/set_sale_status.do`,params);

//商品详情
export const queryProductDetail = params => Request(`/manage/product/detail.do`,params);

//添加商品
export const addProduct = params => Request(`/manage/product/save.do`,params);

//获取品类
export const requestCategoryList = params => Request(`/manage/category/get_category.do`, params);

//添加品类
export const requestAddCategory = params => Request(`/manage/category/add_category.do`, params);

//修改品类名字
export const setCategoryName = params => Request(`/manage/category/set_category_name.do`, params);

//订单列表
export const requestOrderList = params => Request(`/manage/order/list.do`, params);

//按订单编号查询订单列表
export const queryOrderList = params => Request(`/manage/order/search.do`,params);

//订单详情
export const requestOrderDetail = params => Request(`/manage/order/detail.do`,params);

//用户列表
export const requestUserList = params => Request(`/manage/user/list.do`, params);
