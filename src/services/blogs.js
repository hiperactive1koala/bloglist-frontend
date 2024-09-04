import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = async () => {
  const request = axios.get(baseUrl);
  const response = await request;
  return response.data;
};

const getById = async (id) => {
  const request = axios.get(baseUrl);
  const response = await request;
  return response.data.filter((blog) => blog.id === id)[0];
};

const create = async (newObj) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, newObj, config);
  return response.data;
};

const change = async (newObj) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.put(`${baseUrl}/${newObj.id}`, newObj, config);
  return response.data;
};

const comment = async (newObj) => {
  const response = await axios.post(`${baseUrl}/${newObj.id}/comments`, newObj);
  return response.data;
};

const deleteOne = async (id) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response.data;
};

export default {
  getAll,
  getById,
  create,
  change,
  comment,
  deleteOne,
  setToken,
};
