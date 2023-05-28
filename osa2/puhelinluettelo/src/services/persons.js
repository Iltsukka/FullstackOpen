import axios from "axios";
const baseUrl = 'http://localhost:3001/persons'

const getAll = ()=>{
    const request= axios.get(baseUrl)
    return request.then(response=>response.data)
}

const create = (newObject) => {
    const request= axios.post(baseUrl, newObject)
    return request.then(response=> response.data)
}

const remove = (url) => {
    return axios.delete(url)

}

const exportedObject = {
    getAll: getAll,
    create: create,
    remove: remove
}

export default exportedObject