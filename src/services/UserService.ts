import axios from "axios";

const API_BASE_URL = "https://reqres.in/api";
const API_KEY = "reqres-free-v1";

const getUsers = () => {
  return axios.get(`${API_BASE_URL}/users`, {
    headers: {
      "x-api-key": API_KEY,
    },
  });
};

const loginUser = (data: any) => {
  return axios.post(`${API_BASE_URL}/login`, data, {
    headers: {
      "x-api-key": API_KEY,
    },
  });
};

const createUser = (user: any) => {
  return axios.post(`${API_BASE_URL}/users`, user, {
    headers: {
      "x-api-key": API_KEY,
    },
  });
};

const updateUser = (id: any, user: any) => {
  return axios.put(`${API_BASE_URL}/users/${id}`, user, {
    headers: {
      "x-api-key": API_KEY,
    },
  });
};

const deleteUser = (id: number) => {
  return axios.delete(`${API_BASE_URL}/users/${id}`, {
    headers: {
      "x-api-key": API_KEY,
    },
  });
};

export const UserListService = {
  getUsers,
  loginUser,
  createUser,
  updateUser,
  deleteUser,
};
