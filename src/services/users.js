import axios from "axios";
const baseUrl = "/api/users";

const getAllUsers = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const getUserById = async (id) => {
  const response = await axios.get(baseUrl);
  return response.data.filter((user) => user.id === id)[0];
};

export default { getAllUsers, getUserById };
