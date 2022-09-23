import axios from 'axios'
import config from '@/config/config'

const instance = axios.create({})

instance.defaults.baseURL = config.apiURL
instance.interceptors.request.use(config => {
    console.log('Interceptando requisição: ', config)
    config.data = {
        ...config.data
    }

    config.headers.common['Authorization'] = `Token_jwt`
    config.headers.put['Authorization_Put'] = 'Token_jwt put'

    return config

    /*return new Promise( (resolve, reject) => {
        console.log('Aguarde, fazendo requisição...')
        setTimeout(() => {
            console.log('Enviando requisição...')
            resolve(config)
        }, 1000)
    })*/
}, error => {
    console.log('Erro ao fazer requisição: ', error)
    return Promise.reject(error)
})

instance.interceptors.response.use(response => {
    console.log('Interceptando resposta :', response)
    if(Array.isArray(response.data)) {
        response.data = response.data.slice(0,3)
    }
    return response
}, error => {
    console.log('Erro capturado na resposta :', error)
    return Promise.reject(error)
})

export default instance