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

export default instance