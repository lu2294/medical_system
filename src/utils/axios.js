import axios from './axios.config'

const request = {}

const defaultGetConfig = {

}
const defaultPostConfig = {

}

const defaultPutConfig = {

}


request.get = (url, config) => axios.get(url, {
    params: {
        ...defaultGetConfig,
        ...config
    }}
)

request.post = (url, config) => axios.post(url, {
    ...defaultPostConfig,
    ...config
})

request.delete = (url, config) => axios.delete(url, {
    data: config
}
)

request.put = (url, config) => axios.put(url, {
    ...defaultPutConfig,
    ...config
})



export default request 