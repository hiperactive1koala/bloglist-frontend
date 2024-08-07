import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObj => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(baseUrl, newObj, config)
  return response.data
}

const change = async newObj => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.put(`${baseUrl}/${newObj.id}`, newObj, config)
  return response.data
}

const deleteOne = async id => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

export default { getAll, create, change, deleteOne, setToken }