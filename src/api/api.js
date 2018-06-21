import axios from 'axios';
const baseURL = ''

axios.defaults.headers.post['Content-Type'] = 'application/json';
const Request = axios.create({
    baseURL: baseURL,
    timeout: 10 * 1000,
})

export const requestLogin = params => {return Request.post(`/manage/user/login.do`, params, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(res => res.data)};
