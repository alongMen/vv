import axios from 'axios'
import { Message } from 'element-ui'

const service = axios.create({
    baseURL: 'http://localhost:8089',
    timeout: 60000,
})

service.interceptors.request.use(config => {
    if (localStorage.getItem('token')) {
        config.headers.Authorization = localStorage.getItem('token')
    }

    return config
}, (error) => Promise.reject(error))

service.interceptors.response.use(response => {
    const res = response.data
    // 这里是接口处理的一个示范，可以根据自己的项目需求更改
    // 错误处理
    if (res.code != 1 && res.msg) {
        Message.error({
            content: res.msg,
        })

        // token 无效，清空路由，退出登录
        if (res.code == 2) {
            Message.error({
                content: res.msg,
            })
        }

        return Promise.reject()
    }

    // 如果接口正常，直接返回数据
    return res
}, (error) => {
    if (error.name == 'Error') {
        Message.error({
            content: error.msg,
        })
    } else {
        Message.error({
            content: error.response.data.data || error.message,
        })
    }

    return Promise.reject(error)
})

export default service
