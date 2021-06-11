import axios from 'axios'

export function request(config){
    //创建axios对象
    const instant = axios.create({
        baseURL:'http://localhost:9527/api/',
        timeout:5000
    })

    //请求拦截
    instant.interceptors.request.use( config =>{
        return config;
    } )

    //响应拦截
    instant.interceptors.response.use( res =>{
        return res.data;
    })

    return instant(config)
} 